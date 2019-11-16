import * as Yup from 'yup';
import { addMonths, parseISO, isBefore } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: [
        'id',
        'start_date',
        'end_date',
        'price',
        'student_id',
        'plan_id',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'price', 'duration'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const date = parseISO(start_date);

    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permmited' });
    }

    const student = await Student.findOne({
      where: { id: student_id },
      attributes: ['name', 'email'],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists. ' });
    }

    const endDate = addMonths(date, plan.duration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: date,
      end_date: endDate,
      price: plan.duration * plan.price,
    });

    const registrationComplete = await Registration.findByPk(registration.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    await Queue.add(RegistrationMail.key, {
      registrationComplete,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const registration = await Registration.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    // Check if admin can edit student_id
    if (student_id !== registration.student_id) {
      const studentRegistrationExists = await Registration.findOne({
        where: { student_id },
      });

      if (studentRegistrationExists) {
        return res
          .status(401)
          .json({ error: 'A registration with this student already exists' });
      }
    }

    let { price, end_date } = registration;

    // Calculate the full price and end date
    if (plan_id !== registration.plan_id) {
      price = plan.duration * plan.price;
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    // Calculate the new end date
    if (start_date !== registration.start_date) {
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    await registration.save();

    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Registration.destroy({ where: { id } });

    return res.send();
  }
}

export default new RegistrationController();

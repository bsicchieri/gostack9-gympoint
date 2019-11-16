import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import AnswerMail from '../jobs/AnswerMail';

import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const helporder = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (helporder.length === 0) {
      return res.status(200).json('You have no new questions!');
    }

    return res.json(helporder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helporder = await HelpOrder.findOne({
      where: { student_id: id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    const answerAt = new Date();

    await helporder.update({
      answer,
      answer_at: answerAt,
    });

    await Queue.add(AnswerMail.key, {
      helporder,
    });

    return res.json(helporder);
  }
}

export default new AnswerController();

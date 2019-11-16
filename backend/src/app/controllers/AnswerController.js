import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const anwerOrder = await HelpOrder.findAll({
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

    if (anwerOrder.length === 0) {
      return res.status(200).json('All clear!');
    }

    return res.json(anwerOrder);
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

    const anwerOrder = await HelpOrder.findOne({
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

    await anwerOrder.update({
      answer,
      answer_at: answerAt,
    });

    return res.json(anwerOrder);
  }
}

export default new AnswerController();

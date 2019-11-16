import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = req.params;

    const helporder = await HelpOrder.findAll({
      where: { student_id: id },
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

    return res.json(helporder);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const helporder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(helporder);
  }
}

export default new HelpOrderController();

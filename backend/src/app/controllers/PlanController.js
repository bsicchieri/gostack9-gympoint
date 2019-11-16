import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ['price'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails! ' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails! ' });
    }

    const { id } = req.params;
    const { title, duration, price } = req.body;

    const plan = await Plan.findByPk(id);

    if (req.body.title !== plan.title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res.status(401).json({ error: 'This plan already exists!' });
      }
    }

    await plan.update({ title, duration, price });
    await plan.save();

    return res.json(plan);
  }

  async delete(req, res) {
    const checkPlanExist = await Plan.findByPk(req.params.id);

    if (!checkPlanExist) {
      return res.status(400).json({ error: 'Plan does not exist!' });
    }

    const { id } = req.params;

    await Plan.destroy({ where: { id } });

    return res.json({ error: 'Plan deleted!' });
  }
}

export default new PlanController();

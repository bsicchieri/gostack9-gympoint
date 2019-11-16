import Mail from '../../lib/Mail';

class Answermail {
  get key() {
    return 'Answermail';
  }

  async handle({ data }) {
    const { helporder } = data;

    await Mail.sendMail({
      to: `${helporder.student.name} <${helporder.student.email}>`,
      subject: 'Resposta equipe GymPoint!',
      template: 'answer',
      context: {
        student: helporder.student.name,
        question: helporder.question,
        answer: helporder.answer,
      },
    });
  }
}

export default new Answermail();

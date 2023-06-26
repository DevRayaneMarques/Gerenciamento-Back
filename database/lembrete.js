const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/lembrete', async (req, res) => {
  const { description, value, dueDate, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'boscolorayane51@gmail.com',
      pass: 'Rayane170212@'
    }
  });

  const mailOptions = {
    from: 'boscolorayane@gmail.com',
    to: email,
    subject: 'Lembrete de Contas',
    html: `
      <p>Seguem as informações do seu lembrete de contas:</p>
      <ul>
        <li><strong>Descrição:</strong> ${description}</li>
        <li><strong>Valor:</strong> R$${value}</li>
        <li><strong>Data de Vencimento:</strong> ${dueDate}</li>
      </ul>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar email' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
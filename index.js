const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001; // ou a porta que você desejar usar

app.use(express.json());
app.use(cors()); // Habilitar o CORS para permitir chamadas do frontend

// Rota para enviar o e-mail de lembrete
app.post('/enviar-lembrete', async (req, res) => {
  const { email, subject, message } = req.body;

  // Configurar o transporte de e-mail
  const transporter = nodemailer.createTransport({
    // Configurações do provedor de e-mail (por exemplo, Gmail)
    service: 'Gmail',
    auth: {
      user: 'boscolorayane51@gmail.com',
      pass: '5251789*@R',
    },
  });

  const mailOptions = {
    from: 'boscolorayane@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

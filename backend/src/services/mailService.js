const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'hypertube13@yandex.ru',
    pass: 'hypertube12345',
  },
});

const sendMail = async (userEmail, subject, text) => {
  const message = {
    from: 'hypertube13@yandex.ru',
    to: userEmail,
    subject,
    html: `<p>${text}</p>`,
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendMail,
};

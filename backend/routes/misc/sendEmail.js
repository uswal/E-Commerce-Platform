const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "contact@sootistudio.com",
      pass: "Sunshine@2310",
    },
  });

  var mailOptions = {
    from: "Sooti Studio",
    to: to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
  return true;
}

module.exports = sendEmail;

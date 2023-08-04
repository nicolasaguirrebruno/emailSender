const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = "equiposimed@gmail.com";
const PASSWORD = "mrxwftvckslqavii";

/** send mail from real gmail account */
const sendEmail = (req, res) => {
  const { userEmail, clientName, clientQuery } = req.body;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
      name: "Identiclic",
      link: "https://identiclic.com",
    },
  });

  let response = {
    body: {
      name: "Fernando Aguirre",
      intro: "Has recibido una nueva consulta!",
      table: {
        data: [
          {
            nombre: `${clientName}`,
            email: `${clientEmail}`,
          },
        ],
      },
      outro: `${clientQuery}`,
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Nueva Consulta",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
};

module.exports = {
  sendEmail,
};

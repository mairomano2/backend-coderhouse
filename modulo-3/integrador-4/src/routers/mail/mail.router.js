const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

//TODO cambiar la data de ethereal por mis datos cuando se verifique la cuenta
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "keely48@ethereal.email",
    pass: "tzCHSy5wdhaQsrETXZ",
  },
});

router.get("/", async (req, res) => {
  const mailParams = {
    from: "Coder Test <keely48@ethereal.email>",
    to: "mairomano2@gmail.com",
    subject: "Test email",
    html: `<button><a href="http://localhost:8080/changePassword">Change password</a></button>`,
    attachments: [],
  };

  const response = await transporter.sendMail(mailParams);
  res.send({
    success: true,
    payload: response,
  });
});

router.post("/changePassword", async (req, res) => {
  const { mail, password } = req.body;

  
});

module.exports = router;

const { Router } = require("express");
const twilio = require("twilio")
const router = Router();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

router.get("/", async (req, res) => {
  const result = await twilioClient.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.USER_PHONE_NUMBER,
    body: "Test SMS",
  })

  res.send({
    success: true,
    payload: result,
  });
});

module.exports = router;

const sgMail = require("@sendgrid/mail");
const { httpError } = require("../helpers");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const BASE_URL_FRONTEND = "https://news-portal-refactor.vercel.app";

async function sendSgEmail(emailOfUser, passwordToken) {
  try {
    const mailOptions = {
      from: "gregterekhov@gmail.com",
      to: `${emailOfUser}`,
      subject: "News portal, change password letter",
      html: `<h2>Changing the password for the "News" application!</h2>
          <p>If it is you who is changing the password registered to e-mail: ${emailOfUser},<p>
          <p>then click <a target="_blank" href="${BASE_URL_FRONTEND}?token=${passwordToken}&openModal=true">"Yes"</a>,<p> 
          <p>but if it is not you who is trying to change the password, then ignore this message.</p>
          `,
    };

    const result = await sgMail.send(mailOptions);
    console.log("Email send success:", result);
  } catch (error) {
    console.error("Error sending message:", error);
    throw httpError(500, "Sending failed");
  }
}

module.exports = { sendSgEmail };

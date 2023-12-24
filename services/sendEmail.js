const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { GOOGLE_SEND_EMAIL_CLIENT_ID, GOOGLE_SEND_EMAIL_CLIENT_SECRET, GOOGLE_SEND_EMAIL_REFRESH } =
  process.env;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const BASE_URL_FRONTEND = "https://news-portal-refactor.vercel.app";

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_SEND_EMAIL_CLIENT_ID,
  GOOGLE_SEND_EMAIL_CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: GOOGLE_SEND_EMAIL_REFRESH,
});

async function sendMail(emailOfUser, passwordToken) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "news.pt2023@gmail.com",
        clientId: GOOGLE_SEND_EMAIL_CLIENT_ID,
        clientSecret: GOOGLE_SEND_EMAIL_CLIENT_SECRET,
        refreshToken: GOOGLE_SEND_EMAIL_REFRESH,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "news.pt2023@gmail.com",
      to: `${emailOfUser}`,
      subject: "News portal, change password letter",
      html: `<h2>Changing the password for the "News" application!</h2>
          <p>If it is you who is changing the password registered to e-mail: ${emailOfUser},<p>
          <p>then click <a target="_blank" href="${BASE_URL_FRONTEND}/auth/forgot-password-change?token=${passwordToken}&openModal=true">"Yes"</a>,<p> 
          <p>but if it is not you who is trying to change the password, then ignore this message.</p>
          `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email send success:", result);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

module.exports = { sendMail };

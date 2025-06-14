const transporter = require("../config/transporter");

async function sendReplyMessageToClientEmail({ name, email, originalMessage, replyText }) {
  const subject = "Réponse à votre message - Arbent Volley";
  const currentYear = new Date().getFullYear();

  const html = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fa;padding:20px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #ddd;font-family:Arial,sans-serif;padding:20px">
          <tr>
            <td style="padding:20px 0;font-size:24px;color:#333;font-weight:bold">
              Bonjour ${name},
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;color:#555;line-height:1.5">
              Vous avez contacté Arbent Volley. Voici notre réponse à votre message :
            </td>
          </tr>

          <tr>
            <td style="padding-top:20px;font-size:16px;color:#555;font-weight:bold">
              Votre message original :
            </td>
          </tr>
          <tr>
            <td style="padding:10px 15px;background-color:#f7f7f7;border-left:4px solid #2196F3;color:#333;font-size:16px;line-height:1.4;white-space:pre-wrap;">
              ${originalMessage}
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;font-size:16px;color:#555;font-weight:bold">
              Notre réponse :
            </td>
          </tr>
          <tr>
            <td style="padding:10px 15px;background-color:#e8f0fe;border-left:4px solid #0b57d0;color:#333;font-size:16px;line-height:1.4;white-space:pre-wrap;">
              ${replyText}
            </td>
          </tr>

          <tr>
            <td style="padding-top:30px;font-size:16px;color:#555">
              Cordialement,<br />
              L'équipe Arbent Volley
            </td>
          </tr>
          <tr>
            <td style="padding-top:40px">
              <hr style="border:0;height:1px;background-color:#eee" />
            </td>
          </tr>
          <tr>
            <td style="font-size:12px;color:#aaa;text-align:center;padding-top:20px">
              © ${currentYear} Arbent Volley. Tous droits réservés.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendReplyMessageToClientEmail };

const transporter = require("../config/transporter");

async function sendReplyToClientEmail(message) {
  // --- статические тексты письма ---
  const subject = "Nous avons bien reçu votre message";
  const currentYear = new Date().getFullYear();

  // HTML‑шаблон
  const html = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fa;padding:20px">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border:1px solid #ddd;font-family:Arial,sans-serif;padding:20px">
          <tr>
            <td style="padding:20px 0;font-size:24px;color:#333;font-weight:bold">
              Bonjour ${message.name},
            </td>
          </tr>
          <tr>
            <td style="font-size:16px;color:#555;line-height:1.5">
              Merci de nous avoir contactés.<br />
              Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.
            </td>
          </tr>
          <tr>
            <td style="padding-top:30px;font-size:16px;color:#555;font-weight:bold">
              Votre message&nbsp;:
            </td>
          </tr>
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:10px 15px;background-color:#f7f7f7;border-left:4px solid #2196F3;color:#333;font-size:16px;line-height:1.4">
                    ${message.message}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top:30px;font-size:16px;color:#555">
              Cordialement,<br />
              L'équipe Blue&nbsp;Coast
            </td>
          </tr>
          <tr>
            <td style="padding-top:40px">
              <hr style="border:0;height:1px;background-color:#eee" />
            </td>
          </tr>
          <tr>
            <td style="font-size:12px;color:#aaa;text-align:center;padding-top:20px">
              © ${currentYear} Arbent Volley. Tous droits réservés.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: message.email,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendReplyToClientEmail };

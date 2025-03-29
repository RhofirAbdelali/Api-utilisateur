import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to: string, prenom: string) => {
  const mailOptions = {
    from: `"Justicket 👋" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Bienvenue chez Justicket 🎉",
    html: `<h2>Bienvenue ${prenom} !</h2>
           <p>Merci de vous être inscrit sur Justicket. Nous sommes ravis de vous avoir parmi nous !</p>
           <p>Profitez pleinement de nos services.</p>
           <p>🎫 L'équipe Justicket</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetEmail = async (to: string, token: string) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: `"JustiTicket" <${process.env.GMAIL_USER}>`,
    to,
    subject: "🔐 Réinitialisation de mot de passe",
    html: `
      <h2>Demande de réinitialisation de mot de passe</h2>
      <p>Tu as demandé à réinitialiser ton mot de passe. Clique sur le lien ci-dessous :</p>
      <a href="${resetLink}">${resetLink}</a>
      <br/>
      <small>Ce lien expire dans 1 heure.</small>
    `,
  });
};
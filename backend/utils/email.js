const nodemailer = require('nodemailer');
const xss = require('xss');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    // Sanitize HTML to prevent XSS
    const sanitizedHtml = xss(html);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: sanitizedHtml
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };

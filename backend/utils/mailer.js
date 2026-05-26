const nodemailer = require('nodemailer')
const config = require('../config')

function ensureMailConfig() {
  if (!config.mail.user || !config.mail.pass || !config.mail.from) {
    throw new Error('Email service is not configured')
  }
}

function createTransporter() {
  ensureMailConfig()

  return nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    },
  })
}

function sendPasswordResetEmail(email) {
  const transporter = createTransporter()
  const mailOptions = {
    from: config.mail.from,
    to: email,
    subject: 'NewsExplorer password reset request',
    text: 'A password reset was requested for your NewsExplorer account. If this was you, contact support to complete the reset flow.',
    html: '<p>A password reset was requested for your <strong>NewsExplorer</strong> account.</p><p>If this was you, contact support to complete the reset flow.</p>',
  }

  return transporter.sendMail(mailOptions)
}

module.exports = {
  sendPasswordResetEmail,
}

const nodemailer = require('nodemailer');
const db = require('../database/db');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

exports.sendNewsletter = (subject, text, html) => {
    db.all('SELECT Email FROM Users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching emails:', err);
            return;
        }
        const recipients = rows.map(row => row.Email);

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: recipients,
            subject: subject,
            text: text,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Newsletter sent: %s', info.messageId);
        });
    });
};

const nodemailer = require('nodemailer');
const db = require('../database/db');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '183324992lei@gmail.com',
        pass: 'yhex ulnu mucg efny'
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

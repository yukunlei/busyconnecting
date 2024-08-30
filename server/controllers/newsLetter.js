const nodemailer = require('nodemailer');
const express = require('express');
const {join} = require("path");
const sqlite3 = require('sqlite3').verbose();
const app = express();
// Path to your SQLite database file
const dbPath = join(__dirname, '../database/database.sqlite');
// Connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
const port = 3001;

// Endpoint to query all categories
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM Category';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Endpoint to query users grouped by category
app.get('/users/by-category', (req, res) => {
    const sql = `
        SELECT c.CategoryName, u.FirstName, u.LastName, u.Email
        FROM UserData u
        LEFT JOIN Category c ON u.CategoryId = c.CategoryId
        ORDER BY c.CategoryName
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        const groupedData = rows.reduce((acc, row) => {
            if (!acc[row.CategoryName]) {
                acc[row.CategoryName] = [];
            }
            acc[row.CategoryName].push({
                FirstName: row.FirstName,
                LastName: row.LastName,
                Email: row.Email
            });
            return acc;
        }, {});

        res.json({
            "message": "success",
            "data": groupedData
        });
    });
});

// Setup the transporter (this example uses Gmail, you might need to adjust for your email provider)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendNewsletter = (subject, text, html) => {
    db.all('SELECT Email FROM UserData', [], (err, rows) => {
        if (err) {
            console.error('Error fetching emails:', err);
            return;
        }
        // List of emails to send the newsletter to
        const recipients = rows.map(row => row.Email);

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: recipients,
            subject: subject,
            text: text, // Plain text version of the email
            html: html  // HTML version of the email
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Newsletter sent: %s', info.messageId);
        })
    });
};

// Endpoint to send the newsletter
app.post('/send-newsletter', (req, res) => {
    const { subject, text, html } = req.body;

    if (!subject || !text || !html) {
        return res.status(400).json({ error: 'Subject, text, and HTML content are required.' });
    }

    sendNewsletter(subject, text, html);
    res.status(200).json({ message: 'Newsletter is being sent!' });
});

// Route to add a new user
app.post('/subscribe', (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'First Name, Last Name, and Email are required' });
    }

    const checkUserQuery = `SELECT * FROM Users WHERE Email = ?`;
    const insertUserQuery = `
        INSERT INTO Users (FirstName, LastName, Email, CategoryId, DateOfJoining)
        VALUES (?, ?, ?, 1, date('now'))
    `;

    db.get(checkUserQuery, [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }

        if (row) {
            return res.status(400).json({ message: 'User already subscribed' });
        }

        db.run(insertUserQuery, [firstName, lastName, email], function(err) {
            if (err) {
                return res.status(500).json({ message: 'Failed to subscribe user', error: err.message });
            }

            return res.status(201).json({ message: 'User successfully subscribed', userId: this.lastID });
        });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

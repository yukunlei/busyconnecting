const db = require('../database/db');
const { sendNewsletter } = require('../services/newsletterService');

exports.getCategories = (req, res) => {
    const sql = 'SELECT * FROM Category';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
};

exports.getUsersByCategory = (req, res) => {
    const sql = `
        SELECT c.CategoryName, u.FirstName, u.LastName, u.Email
        FROM Users u
        LEFT JOIN Category c ON u.CategoryId = c.CategoryId
        ORDER BY c.CategoryName
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
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
};

exports.subscribeUser = (req, res) => {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'First Name, Last Name, and Email are required' });
    }

    const checkUserQuery = `SELECT * FROM Users WHERE Email = ?`;
    const insertUserQuery = `
        INSERT INTO Users (FirstName, LastName, Email, CategoryId, DateOfJoining)
        VALUES (?, ?, ?, 4, date('now'))
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
};

exports.sendNewsletter = (req, res) => {
    const { subject, text, html, recipients} = req.body;

    // if (!subject || !text) {
    //     return res.status(400).json({ error: 'Subject, text, and HTML content are required.' });
    // }

    sendNewsletter(subject, text, html, recipients);
    res.status(200).json({ message: 'Newsletter is being sent!' });
};



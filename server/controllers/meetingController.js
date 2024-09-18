const db = require('../database/db');

exports.bookAppointment = (req, res) => {
    const { date, startTime, name, email, phone, address, notes } = req.body;

    console.log('Received data:', { date, startTime, name, email, phone, address, notes });

    if (!date || !startTime) {
        return res.status(400).json({ error: 'Date and Start Time are required' });
    }

    // Additional basic validation for other required fields
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, Email, and Phone are required' });
    }

    // You can add more complex validation (e.g., regex for email/phone format)
    const sql = `
        INSERT INTO appointments (Date, StartTime, Name, Email, Phone, Address, Notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [date, startTime, name, email, phone, address, notes], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ id: this.lastID });
    });
};

exports.checkAvailability = (req, res) => {
    const { date, startTime } = req.query;

    if (!date || !startTime) {
        return res.status(400).json({ error: 'Date and Start Time are required' });
    }

    const sql = `SELECT * FROM appointments WHERE Date = ? AND StartTime = ?`;

    db.get(sql, [date, startTime], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        // If a row is found, the time slot is taken
        res.json({ available: !row });
    });
};



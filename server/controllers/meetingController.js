const db = require('../database/db');
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '183324992lei@gmail.com',
        pass: 'yhex ulnu mucg efny'
    }
});

exports.bookAppointment = (req, res) => {
    const { date, startTime, name, email, phone, address, notes } = req.body;

    console.log('Received data:', { date, startTime, name, email, phone, address, notes });

    if (!date || !startTime) {
        return res.status(400).json({ error: 'Date and Start Time are required' });
    }

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, Email, and Phone are required' });
    }

    // SQL to insert appointment
    const sql = `
        INSERT INTO appointments (Date, StartTime, Name, Email, Phone, Address, Notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(sql, [date, startTime, name, email, phone, address, notes], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Confirmation email to the user
        const userMailOptions = {
            from: '183324992lei@gmail.com', // sender address
            to: email, // receiver's email
            subject: 'Appointment Confirmation',
            text: `Dear ${name},\n\nYour appointment has been successfully booked.\n\nDetails:\nDate: ${date}\nTime: ${startTime}\n\nThank you for scheduling with us.\n\nBest regards,\nYour Company Name`,
        };

        // Send the confirmation email to the user
        transporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
                console.error('Error sending confirmation email:', error);
                return res.status(500).json({ error: 'Error sending confirmation email' });
            }

            console.log('Confirmation email sent:', info.response);

            // Reminder email to your own email
            const reminderMailOptions = {
                from: '183324992lei@gmail.com', // sender address
                to: 'gilbertlavenskychan@gmail.com', // your own email
                subject: 'New Appointment Booked',
                text: `A new appointment has been successfully booked.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${startTime}\nAddress: ${address}\nNotes: ${notes}`,
            };

            // Send the reminder email to yourself
            transporter.sendMail(reminderMailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending reminder email:', error);
                    return res.status(500).json({ error: 'Error sending reminder email' });
                }

                console.log('Reminder email sent to admin:', info.response);
                res.status(201).json({ id: this.lastID, message: 'Appointment successfully booked, confirmation and reminder emails sent' });
            });
        });
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
        res.json({ available: !row }); // Send availability response
    });
};

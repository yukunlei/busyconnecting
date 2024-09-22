const db = require('../database/db');

// Create a new user
exports.createUser = (req, res) => {
    const { FirstName, LastName, Email, CategoryId, DateOfJoining } = req.body;
    const sql = "INSERT INTO Users (FirstName, LastName, Email, CategoryId, DateOfJoining) VALUES (?, ?, ?, ?, ?)";
    
    db.run(sql, [FirstName, LastName, Email, CategoryId, DateOfJoining], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ UserId: this.lastID });
    });
};

// Get all users
exports.getAllUsers = (req, res) => {
    const sql = `SELECT * FROM Users ORDER BY DateOfJoining DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Get the latest 3 users
exports.latestUsers = (req, res) => {
    const sql = `SELECT * FROM Users ORDER BY DateOfJoining DESC LIMIT 3`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Users WHERE UserId = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(row);
    });
};

// Update a user by ID
exports.updateUserById = (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, Email, CategoryId, DateOfJoining } = req.body;
    
    const sql = `UPDATE Users SET FirstName = ?, LastName = ?, Email = ?, CategoryId = ?, DateOfJoining = ? WHERE UserId = ?`;
    
    db.run(sql, [FirstName, LastName, Email, CategoryId, DateOfJoining, id], function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
};

// Delete a user by ID
exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM Users WHERE UserId = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully' });
    });
};

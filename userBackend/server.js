const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

const db = new sqlite3.Database('database.sqlite');

app.get('/api/blogpage', (req, res) => {
    const query = "SELECT * FROM BlogPage ORDER BY BlogDateTime DESC";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.get('/api/eventpage', (req, res) => {
    const query = "SELECT * FROM EventPage ORDER BY DateTime DESC";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

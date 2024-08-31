const db = require('../database/db');

exports.getHomePage = (req, res) => {
    const sql = `SELECT * FROM HomePage WHERE rowid = 1`;
    db.get(sql, [], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
};

exports.updateHomePage = (req, res) => {
    const { HeaderTitle, HeaderContent, Video, SecondTitle, SecondContent } = req.body;
    const image = req.file ? req.file.buffer : null;
    const sql = `UPDATE HomePage SET HeaderTitle = ?, HeaderContent = ?, Video = ?, SecondTitle = ?, SecondContent = ?, Image = ? WHERE rowid = 1`;

    db.run(sql, [HeaderTitle, HeaderContent, Video, SecondTitle, SecondContent, image], function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Home page updated successfully' });
    });
};

// Other home-related controller functions can be defined here

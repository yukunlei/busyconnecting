const db = require('../database/db');

exports.getHomePage = (req, res) => {
    const sql = `SELECT * FROM HomePage WHERE rowid = 1`;
    db.get(sql, [], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'No data found' });
        }

        // Convert BLOB image data to Base64
        const convertToBase64 = (blob) => blob ? Buffer.from(blob).toString('base64') : null;

        // Prepare the response object
        const response = {
            HeaderTitle: row.HeaderTitle,
            HeaderContent: row.HeaderContent,
            Video: row.Video,
            SecondTitle: row.SecondTitle,
            SecondContent: row.SecondContent,
            Image: convertToBase64(row.Image) // Convert BLOB to Base64
        };

        res.json(response);
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

const db = require('../database/db');

exports.createBlog = (req, res) => {
    const { Title, BlogDateTime, Content1, Content2 } = req.body;
    const image = req.file ? req.file.buffer : null;
    const sql = "INSERT INTO BlogPage (Title, BlogDateTime, Content1, Content2, Image) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [Title, BlogDateTime, Content1, Content2, image], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ BlogId: this.lastID });
    });
};

exports.getAllBlogs = (req, res) => {
    const sql = `SELECT * FROM BlogPage ORDER BY BlogDateTime DESC`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }

        // Convert each BLOB image to Base64
        const blogs = rows.map(blog => ({
            BlogId: blog.BlogId,
            Title: blog.Title,
            BlogDateTime: blog.BlogDateTime,
            Content1: blog.Content1,
            Content2: blog.Content2,
            Image: blog.Image ? Buffer.from(blog.Image).toString('base64') : null // Convert BLOB to Base64
        }));

        res.json(blogs);
    });
};


exports.latestBlogs = (req, res) => {
    const sql = `SELECT * FROM BlogPage ORDER BY BlogDateTime DESC LIMIT 3`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }

        // Process each row to convert the Image BLOB to Base64
        const processedRows = rows.map(row => ({
            BlogId: row.BlogId,
            Title: row.Title,
            BlogDateTime: row.BlogDateTime,
            Content1: row.Content1,
            Content2: row.Content2,
            Image: row.Image ? Buffer.from(row.Image).toString('base64') : null // Convert BLOB to Base64
        }));

        res.json(processedRows);
    });
};

exports.getBlogById = (req, res) => {
    const { id } = req.params;
    console.log("Request received for blog ID:", id);

    const sql = 'SELECT * FROM BlogPage WHERE BlogId = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Database error occurred:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            console.log('No data found for blog with ID:', id);
            return res.status(404).json({ error: 'Blog not found' });
        }
        console.log('Data found, sending response:', row);
        res.json({
            BlogId: row.BlogId,
            Title: row.Title,
            BlogDateTime: row.BlogDateTime,
            Content1: row.Content1,
            Content2: row.Content2,
            Image: row.Image ? Buffer.from(row.Image).toString('base64') : null // Convert BLOB to Base64
        });
    });
};

exports.updateBlogById = (req, res) => {
    const { id } = req.params;
    const { Title, BlogDateTime, Content1, Content2 } = req.body;
    const image = req.file ? req.file.buffer : null;

    if (!image) {
        const sql = `UPDATE BlogPage SET Title = ?, BlogDateTime = ?, Content1 = ?, Content2 = ? WHERE BlogId = ?`;
        db.run(sql, [Title, BlogDateTime, Content1, Content2, id], function (err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Blog post updated successfully without changing the image' });
        });
    } else {
        const sql = `UPDATE BlogPage SET Title = ?, BlogDateTime = ?, Content1 = ?, Content2 = ?, Image = ? WHERE BlogId = ?`;
        db.run(sql, [Title, BlogDateTime, Content1, Content2, image, id], function (err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Blog post updated successfully with a new image' });
        });
    }
};

exports.deleteBlogById = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM BlogPage WHERE BlogId = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Blog post deleted successfully' });
    });
};

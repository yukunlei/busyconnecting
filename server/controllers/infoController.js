const db = require('../database/db');

exports.getInfoPage = (req, res) => {
    const { page } = req.params;
    let sql = '';

    if (['BusinessFundingPage', 'StrategicPage', 'TendersPage'].includes(page)) {
        sql = `SELECT * FROM ${page} WHERE rowid = 1`;
    } else {
        return res.status(400).json({ error: 'Invalid page requested' });
    }

    db.get(sql, [], (err, row) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            console.log(`No data found for the requested page: ${page}`);
            return res.json({});  // Return an empty object to prevent JSON parsing errors
        }
        res.json(row);
    });
};

exports.updateInfoPage = (req, res) => {
    const { page } = req.params;
    const { title, subtitle, content, subtitle2, content2, subtitle3, content3 } = req.body;
    const image1 = req.files['image1'] ? req.files['image1'][0].buffer : null;
    const image2 = req.files['image2'] ? req.files['image2'][0].buffer : null;
    const image3 = req.files['image3'] ? req.files['image3'][0].buffer : null;

    let sql = '';
    let params = [];

    if (page === 'BusinessFundingPage' || page === 'TendersPage') {
        sql = `UPDATE ${page} SET title = ?, subtitle = ?, content = ?, subtitle2 = ?, content2 = ?, image1 = ?, image2 = ? WHERE rowid = 1`;
        params = [title, subtitle, content, subtitle2, content2, image1, image2];
    } else if (page === 'StrategicPage') {
        sql = `UPDATE ${page} SET title = ?, subtitle = ?, content = ?, subtitle2 = ?, content2 = ?, subtitle3 = ?, content3 = ?, image1 = ?, image2 = ?, image3 = ? WHERE rowid = 1`;
        params = [title, subtitle, content, subtitle2, content2, subtitle3, content3, image1, image2, image3];
    } else {
        return res.status(400).json({ error: 'Invalid page requested' });
    }

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Info page updated successfully' });
    });
};

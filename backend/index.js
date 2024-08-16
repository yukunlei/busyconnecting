const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());   
 
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});
 
// BlogPage  
app.post('/api/blogpage', (req, res) => {
  const { Title, BlogDateTime, Content1, Content2 } = req.body;
  const sql = `INSERT INTO BlogPage (Title, BlogDateTime, Content1, Content2) VALUES (?, ?, ?, ?)`;
  db.run(sql, [Title, BlogDateTime, Content1, Content2], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ BlogId: this.lastID });
  });
});

// EditInfoPage 
app.post('/api/editinfopage', (req, res) => {
  const { PageName, Title, Content1, Content2, Image1, Image2 } = req.body;
  const sql = `INSERT INTO EditInfoPage (PageName, Title, Content1, Content2, Image1, Image2) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [PageName, Title, Content1, Content2, Image1, Image2], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ PageId: this.lastID });
  });
});

// EventPage 
app.post('/api/eventpage', (req, res) => {
  const { Title, DateTime, Content1, Content2, Image } = req.body;
  const sql = `INSERT INTO EventPage (Title, DateTime, Content1, Content2, Image) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [Title, DateTime, Content1, Content2, Image], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ EventId: this.lastID });
  });
});

// HomePage  
app.post('/api/homepage', (req, res) => {
  const { Title, HeaderText, Content2, Image1, Image2, Video } = req.body;
  const sql = `INSERT INTO HomePage (Title, HeaderText, Content2, Image1, Image2, Video) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [Title, HeaderText, Content2, Image1, Image2, Video], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ HomePageId: this.lastID });
  });
});

// UserData 
app.post('/api/userdata', (req, res) => {
  const { FirstName, LastName, Email } = req.body;
  const sql = `INSERT INTO UserData (FirstName, LastName, Email) VALUES (?, ?, ?)`;
  db.run(sql, [FirstName, LastName, Email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ UserId: this.lastID });
  });
});
 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

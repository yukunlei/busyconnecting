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

app.get('/api/blogs', (req, res) => {
  const sql = `SELECT * FROM BlogPage`;  // BlogPage 테이블에서 모든 데이터를 가져오는 쿼리
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);  // 데이터베이스 오류 처리
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);  // JSON 형식으로 데이터 반환
  });
});
 

app.get('/api/homepage', (req, res) => {
  const sql = `SELECT * FROM HomePage WHERE rowid = 1`;
  db.get(sql, [], (err, row) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
      }
      console.log('Sending JSON data:', row);  // 응답으로 보내는 데이터를 로그에 출력
      res.json(row);
  });
});

app.put('/api/homepage', (req, res) => {
  const { HeaderTitle, HeaderContent, Video, SecondTitle, SecondContent } = req.body;
  const sql = `UPDATE HomePage SET HeaderTitle = ?, HeaderContent = ?, Video = ?, SecondTitle = ?, SecondContent = ? WHERE rowid = 1`;
  
  db.run(sql, [HeaderTitle, HeaderContent, Video, SecondTitle, SecondContent], function (err) {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Home page updated successfully' });
  });
});
 
 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

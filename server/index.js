const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/db');

const app = express();
const port = 3001;

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Routes
app.use('/api/blogPage', require('./routes/blogRoutes'));
app.use('/api/infoPage', require('./routes/infoRoutes'));
app.use('/api/homepage', require('./routes/homeRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




/*const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer(); // 메모리 스토리지를 사용하여 업로드 처리

const app = express();
const port = 3001;
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

const dbPath = path.resolve(__dirname, './database/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});*/
// BlogPage
/*app.post('/api/blogPage/addNewBlog', upload.single('Image'), (req, res) => {
  const { Title, BlogDateTime, Content1, Content2 } = req.body;
  const image = req.file ? req.file.buffer : null;
  const sql = "INSERT INTO BlogPage (Title, BlogDateTime, Content1, Content2, Image) VALUES (?, ?, ?, ?, ?)";
  db.run(sql, [Title, BlogDateTime, Content1, Content2, image], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ BlogId: this.lastID });
  });
});
app.get('/api/blogPage/getAllBlog', (req, res) => {
  const sql = `SELECT * FROM BlogPage ORDER BY BlogDateTime DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/blogPage/latestBlogs', (req, res) => {
  const sql = `SELECT * FROM BlogPage ORDER BY BlogDateTime DESC LIMIT 3`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});*/

// homePage
/*app.get('/api/homepage', (req, res) => {
  const sql = `SELECT * FROM HomePage WHERE rowid = 1`;
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Sending JSON data:', row);
    res.json(row);
  });
});

app.put('/api/homepage', upload.single('Image'), (req, res) => {
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
});*/

// Edit Info 관련 엔드포인트 추가

/*app.get('/api/infopage/:page', (req, res) => {
  const page = req.params.page;
  let sql = '';
  console.log("page:", page);
  // 테이블 이름을 동적으로 설정하는 것은 SQL 인젝션에 취약할 수 있으므로 안전한 방식으로 처리해야 합니다.
  if (page === 'BusinessFundingPage' || page === 'StrategicPage' || page === 'TendersPage') {
    sql = `SELECT * FROM ${page} WHERE rowid = 1`;
    console.log("sql:", sql);
    
  } else {
    return res.status(400).json({ error: 'Invalid page requested' });  // 유효하지 않은 페이지 요청에 대한 오류 응답
  }

  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      console.log('No data found for the requested page:', page);
      return res.json({});  // 빈 객체 반환하여 클라이언트에서 JSON 파싱 오류를 방지
    }
    res.json(row);
  });
});

// 페이지 데이터를 업데이트하는 PUT 엔드포인트
app.put('/api/infopage/:page', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), (req, res) => {
  const page = req.params.page;
  const { title, subtitle, content, subtitle2, content2, subtitle3, content3 } = req.body;
  const image1 = req.files['image1'] ? req.files['image1'][0].buffer : null;
  const image2 = req.files['image2'] ? req.files['image2'][0].buffer : null;
  const image3 = req.files['image3'] ? req.files['image3'][0].buffer : null;

  let sql = '';
  let params = [];

  if (page === 'BusinessFundingPage' || page === 'TendersPage') {
    sql = `UPDATE ${page} SET title = ?, subtitle = ?, content = ?, subtitle2 = ?, content2 = ?, image1 = ?, image2 = ? WHERE rowid = 1`; 
    params = [title, subtitle, content, subtitle2, content2, image1, image2 ];
    console.log("sql:", sql);
  } else if (page === 'StrategicPage') {
    sql = `UPDATE ${page} SET title = ?, subtitle = ?, content = ?, subtitle2 = ?, content2 = ?, subtitle3 = ?, content3 = ?, image1 = ?, image2 = ?, image3 = ? WHERE rowid = 1`;
    params = [title, subtitle, content, subtitle2, content2, subtitle3, content3, image1, image2, image3];
 }

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Info page updated successfully' });
  });
});*/


// 특정 블로그 게시물 가져오기
/*app.get('/api/blogpage/:id', (req, res) => {
  const { id } = req.params;
  console.log("Request received for blog ID:", id); // 요청 수신 로그

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
    res.json(row); // JSON 형식으로 응답
  });
});

// Update a specific blog post by ID
app.put('/api/blogpage/:id', upload.single('Image'), (req, res) => {
  const id = req.params.id;
  const { Title, BlogDateTime, Content1, Content2 } = req.body;
  const image = req.file ? req.file.buffer : null;

  // If there's no new image, we should keep the old one
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
});

// Delete a specific blog post by ID
app.delete('/api/blogpage/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM BlogPage WHERE rowid = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Blog post deleted successfully' });
  });
});*/

/*app.get('/api/businessfunding', (req, res) => {
  const sql = `SELECT * FROM BusinessFundingPage WHERE rowid = 1`; // Adjust the SQL as needed
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get('/api/tenders', (req, res) => {
  const sql = `SELECT * FROM TendersPage WHERE rowid = 1`; // Adjust SQL as needed
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

app.get('/api/strategic', (req, res) => {
  const sql = `SELECT * FROM StrategicPage WHERE rowid = 1`; // Adjust SQL as needed
  db.get(sql, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});*/

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});*/

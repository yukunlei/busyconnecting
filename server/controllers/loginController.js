const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db'); 

// 관리자 회원가입 처리
exports.signupAdmin = async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;

    if (!FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ error: '모든 필드를 입력하세요.' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(Password, saltRounds);

        const sql = "INSERT INTO Admin (FirstName, LastName, Email, PasswordHash) VALUES (?, ?, ?, ?)";
        db.run(sql, [FirstName, LastName, Email, passwordHash], function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error: '이미 존재하는 이메일입니다.' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ AdminId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: '서버 에러가 발생했습니다.' });
    }
};

// 관리자 로그인
exports.loginAdmin = (req, res) => {
    const { Email, Password } = req.body;

    // 필드 확인
    if (!Email || !Password) {
        return res.status(400).json({ error: '이메일과 비밀번호를 입력하세요.' });
    }

    // 데이터베이스에서 이메일로 관리자 검색
    const sql = 'SELECT * FROM Admin WHERE Email = ?';
    db.get(sql, [Email], async (err, admin) => {
        if (err) {
            return res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        }
        if (!admin) {
            return res.status(400).json({ error: '존재하지 않는 이메일입니다.' });
        }

        try {
            // 비밀번호 비교
            const match = await bcrypt.compare(Password, admin.PasswordHash);
            if (!match) {
                return res.status(400).json({ error: '잘못된 비밀번호입니다.' });
            }

            // JWT 토큰 생성
            const token = jwt.sign(
                { AdminId: admin.AdminId, Email: admin.Email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: '서버 에러가 발생했습니다.' });
        }
    });
};
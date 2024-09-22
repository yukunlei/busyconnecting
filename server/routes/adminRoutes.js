const express = require('express');
const router = express.Router();
const UserController = require('../controllers/loginController');

// 관리자 회원가입 및 로그인 라우트
router.post('/signup', UserController.signupAdmin);
router.post('/admin/signup', UserController.signupAdmin);
router.post('/admin/login', UserController.loginAdmin);
router.post('/login', UserController.loginAdmin);

module.exports = router;

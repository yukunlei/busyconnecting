import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {  // onLogin prop 추가
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // 리다이렉트를 위한 navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);  // 토큰을 로컬 스토리지에 저장
                onLogin();  // 로그인 상태를 갱신하는 함수 호출
                navigate('/admin');  // 어드민 페이지로 리다이렉트
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || '로그인 실패');
            }
        } catch (error) {
            setErrorMessage('로그인 중 에러가 발생했습니다. 다시 시도하세요.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default LoginPage;

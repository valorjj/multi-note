// src/components/LogoutButton.tsx
import React, {useEffect, useState} from 'react';
import api from '../apis/api';
import {useNavigate} from 'react-router-dom';

const LogoutButton: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬스토리지에 토큰이 있는지 확인
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            // 서버에 로그아웃 요청
            await api.post('/auth/logout');

            // 로컬 스토리지에서 토큰 제거
            localStorage.removeItem('accessToken');

            // 로그인 페이지로 리디렉션
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 실패:', error);
            // 오류가 발생해도 토큰을 제거하고 리디렉션
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
    };

    // 로그인 상태일 때만 버튼 표시
    return isLoggedIn ? (
        <button
            onClick={handleLogout}
            className="logout-button"
        >
            로그아웃
        </button>
    ) : null;
};

export default LogoutButton;
// src/components/Header.tsx
import React, {useEffect, useState} from 'react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const Header: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // 로컬 스토리지에서 accessToken 확인
        const checkLoginStatus = () => {
            const token = localStorage.getItem('accessToken');
            setIsLoggedIn(!!token);
        };

        // 초기 로그인 상태 확인
        checkLoginStatus();

        // 로컬 스토리지 변경 이벤트 리스너 (다른 탭에서의 로그인/로그아웃 감지)
        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <header className="app-header">
            <div className="logo">멀티노트</div>
            <nav>
                {/* 기타 네비게이션 요소들 */}
            </nav>
            {isLoggedIn ? <LogoutButton/> : <LoginButton/>}
        </header>
    );
};

export default Header;
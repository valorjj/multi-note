// src/components/LoginButton.tsx
import React from 'react';
import {googleLoginUrl} from "../utils/auth.ts";

const LoginButton: React.FC = () => {
    const loginHandler = () => {
        window.location.href = googleLoginUrl;
    };

    return (
        <>
            <button onClick={loginHandler}>Login with Google</button>
        </>
    );
};

export default LoginButton;

import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../apis/api.ts";

const OAuth2RedirectHandler: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        const error = params.get('error');

        if (error) {
            navigate('/login', {state: {error}});
            return;
        }

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            // We rely on the server having already set the "refresh_token" HTTP-only cookie
            // (no need to store refreshToken in localStorage).

            // Test a protected request:
            api.get('/auth/me')
                .then(res => {
                    console.log('User info:', res.data);
                    navigate('/');
                })
                .catch(err => {
                    console.error('Token failed:', err);
                    navigate('/login', {state: {error: 'JWT error'}});
                });
        } else {
            navigate('/login', {state: {error: 'Missing tokens'}});
        }
    }, [navigate]);

    return <div>Processing login…</div>;
};

export default OAuth2RedirectHandler;

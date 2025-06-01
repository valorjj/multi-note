import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        const error = params.get('error');

        if (error) {
            // Handle error case
            console.error("OAuth2 login error:", error);
            navigate('/login', {state: {error}});
            return;
        }

        if (accessToken && refreshToken) {
            // Store tokens in localStorage or secure cookie
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Redirect to home or dashboard
            navigate('/');
        } else {
            // Handle missing token case
            navigate('/login', {state: {error: 'Authentication failed'}});
        }
    }, [navigate]);

    return (
        <div className="oauth2-redirect">
            Processing login...
        </div>
    );
};

export default OAuth2RedirectHandler;
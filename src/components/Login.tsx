const Login = () => {
    const loginHandler = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    }

    return (
        <div>
            <button onClick={loginHandler}>로그인</button>
        </div>
    )
}

export default Login;
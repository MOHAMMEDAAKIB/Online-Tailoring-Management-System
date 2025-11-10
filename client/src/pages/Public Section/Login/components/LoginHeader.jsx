import './LoginHeader.css';

function LoginHeader() {
    return (
        <div className="login-header">
            <div className="login-header-content">
                <h1 className="login-header-title">Welcome Back!</h1>
                <p className="login-header-subtitle">
                    Log in to manage your appointments and orders.
                </p>
            </div>
        </div>
    );
}

export default LoginHeader;

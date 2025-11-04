import './LoginPage.css';
import LoginLogo from './components/LoginLogo';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-content">
                    <LoginLogo />
                    <LoginHeader />
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

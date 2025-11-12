import './LoginLogo.css';
import logo from '../../../../assets/Tailaring_Shop_Logo.png';

function LoginLogo() {
    return (
        <div className="login-logo-container">
            <div className="login-logo-wrapper">
                <div 
                    className="login-logo-image"
                    style={{
                        backgroundImage: `url(${logo})`
                    }}
                    role="img"
                    aria-label="Abstract geometric logo with purple and gold elements representing a needle and thread"
                />
            </div>
        </div>
    );
}

export default LoginLogo;

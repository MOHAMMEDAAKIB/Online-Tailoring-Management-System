import './RegisterHeader.css';
import logo from '../../../../assets/Tailaring_Shop_Logo.png';

function RegisterHeader() {
    return (
        <div className="register-header">
            <div className="register-header-brand">
                <img src={logo} alt="TailorFlow Logo" className="register-header-logo-image"/>
                <span className="register-header-logo">TailorFlow</span>
            </div>
            <div className="register-header-title">
                <p className="register-header-text">Create Your Account</p>
            </div>
        </div>
    );
}

export default RegisterHeader;

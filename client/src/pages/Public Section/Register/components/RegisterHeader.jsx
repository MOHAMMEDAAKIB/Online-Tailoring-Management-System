import './RegisterHeader.css';

function RegisterHeader() {
    return (
        <div className="register-header">
            <div className="register-header-brand">
                <span className="material-symbols-outlined register-header-icon">cut</span>
                <span className="register-header-logo">TailorFlow</span>
            </div>
            <div className="register-header-title">
                <p className="register-header-text">Create Your Account</p>
            </div>
        </div>
    );
}

export default RegisterHeader;

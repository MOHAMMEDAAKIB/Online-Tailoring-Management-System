import './RegisterFooter.css';

function RegisterFooter() {
    return (
        <p className="register-footer">
            Already have an account?{' '}
            <a className="register-footer-link" href="/login">
                Log In
            </a>
        </p>
    );
}

export default RegisterFooter;

import { useState } from 'react';
import './RegisterForm.css';
import RegisterHeader from './RegisterHeader';
import RegisterInputs from './RegisterInputs';
import RegisterFooter from './RegisterFooter';

function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Registration data:', formData);
    };

    return (
        <div className="register-form-wrapper">
            <div className="register-form-card">
                <RegisterHeader />
                <form className="register-form" onSubmit={handleSubmit}>
                    <RegisterInputs
                        formData={formData}
                        handleChange={handleChange}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                    />
                    <RegisterFooter />
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;

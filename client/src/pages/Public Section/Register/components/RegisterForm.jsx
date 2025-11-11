import { useState } from 'react';
import './RegisterForm.css';
import { registerUsers } from '../../../../api/authAPI';
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
        role: "customer",
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission

        if (formData.password === formData.confirmPassword) {
            
            const Data = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: formData.role
            }
            console.log('Registration Data to be sent:', Data);
            try{
                // Perform registration logic here (e.g., API call)
                const response = await registerUsers(Data); // Replace with actual API call
                if (response.data.success){
                    alert ("Registration successful! Please log in.");
                    window.location.reload("/login");
                }else{
                    alert ("Registration failed: " + response.data.message);
                }
            } 
            catch (error) {
                console.error('Registration failed:', error);
            }
        }else {
            console.log('Passwords do not match');
        }
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

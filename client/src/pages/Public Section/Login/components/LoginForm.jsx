import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { loginUsers } from '../../../../api/authAPI';
import { useAuth } from '../../../../context/AuthContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', { email, password, rememberMe });
        try {
            const responce = await loginUsers({ email, password })
            if (responce.data.success){
                // Store user data and token using AuthContext
                login(responce.data.data.user, responce.data.data.token);
                
                alert ("Login successful!");
                if (responce.data.data.user.role === 'admin'){
                    navigate("/admin/dashboard", { state: { data: responce.data.data } });
                    return;
                }else if (responce.data.data.user.role === "customer"){
                    navigate("/customer/dashboard", { state: { data: responce.data.data } });
                    return;
                }

            }else{
                alert ("Login failed: " + responce.data.message);
            }
        }catch(e){
            alert ("Login failed: " + e.response.data.message);
        }
        
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-fields">
                {/* Email Field */}
                <div className="login-form-field">
                    <label className="login-form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="login-form-input"
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="login-form-field">
                    <label className="login-form-label" htmlFor="password">
                        Password
                    </label>
                    <div className="login-form-password-wrapper">
                        <input
                            className="login-form-input-password"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="login-form-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <span className="material-symbols-outlined">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="login-form-options">
                    <div className="login-form-remember">
                        <input
                            className="login-form-checkbox"
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label className="login-form-checkbox-label" htmlFor="remember-me">
                            Remember me
                        </label>
                    </div>
                    <a className="login-form-forgot-link" href="#">
                        Forgot password?
                    </a>
                </div>

                {/* Login Button */}
                <button className="login-form-button" type="submit">
                    Login
                </button>

                {/* Divider */}
                <div className="login-form-divider">
                    <div className="login-form-divider-line"></div>
                    <span className="login-form-divider-text">Don't have an account?</span>
                    <div className="login-form-divider-line"></div>
                </div>

                {/* Sign Up Link */}
                <div className="login-form-signup">
                    <a className="login-form-signup-link" href="/register">
                        Sign up
                    </a>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;

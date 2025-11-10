import './RegisterInputs.css';

function RegisterInputs({ 
    formData, 
    handleChange, 
    showPassword, 
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword 
}) {
    return (
        <div className="register-inputs">
            {/* Full Name */}
            <label className="register-input-group">
                <p className="register-input-label">Full Name</p>
                <input
                    className="register-input"
                    type="text"
                    name="fullName"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
            </label>

            {/* Email */}
            <label className="register-input-group">
                <p className="register-input-label">Email</p>
                <input
                    className="register-input"
                    type="email"
                    name="email"
                    placeholder="jane.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>

            {/* Phone */}
            <label className="register-input-group">
                <p className="register-input-label">Phone</p>
                <input
                    className="register-input"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </label>

            {/* Password */}
            <div className="register-input-group-relative">
                <label className="register-input-group">
                    <p className="register-input-label">Password</p>
                    <input
                        className="register-input register-input-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button
                    className="register-password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <span className="material-symbols-outlined">
                        {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
            </div>

            {/* Confirm Password */}
            <div className="register-input-group-relative">
                <label className="register-input-group">
                    <p className="register-input-label">Confirm Password</p>
                    <input
                        className="register-input register-input-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button
                    className="register-password-toggle"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <span className="material-symbols-outlined">
                        {showConfirmPassword ? 'visibility' : 'visibility_off'}
                    </span>
                </button>
            </div>

            {/* Terms Checkbox */}
            <div className="register-terms">
                <input
                    className="register-checkbox"
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                />
                <label className="register-terms-label" htmlFor="terms">
                    I agree to the{' '}
                    <a className="register-terms-link" href="#">
                        Terms &amp; Privacy
                    </a>
                    {' '}policy.
                </label>
            </div>

            {/* Submit Button */}
            <button className="register-submit-button" type="submit">
                Create Account
            </button>
        </div>
    );
}

export default RegisterInputs;

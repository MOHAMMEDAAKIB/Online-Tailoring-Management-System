import './LoginLogo.css';

function LoginLogo() {
    return (
        <div className="login-logo-container">
            <div className="login-logo-wrapper">
                <div 
                    className="login-logo-image"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOEKQvEwQr6FRrYlQuiNCapoT4SiI3ajToRXZPuQPHK4V2wdt0_j2-7HelfEXLGE_2BOeYT6PbOYQ1PM9qjIMZvd9XZCMb7JzEIj6g1OQ-qRqZc8ZQofTRhAsqCJJ1ncK3QDqg9OKm4jbyCJjC-2E31ODTo_X2vUiHwX16QQMoXNftJrCUMWU7HYQ0jNIk3GTn_ZRVLZVqOiMeJS_TI2J6QsI09lSLr-bPgYWOxCpWvdHfAQNvej6Q3Ec-jYCxxYWIi4spKy-_sdm-")'
                    }}
                    role="img"
                    aria-label="Abstract geometric logo with purple and gold elements representing a needle and thread"
                />
            </div>
        </div>
    );
}

export default LoginLogo;

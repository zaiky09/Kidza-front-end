import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import '../Styles/AuthForm.css';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || sessionStorage.getItem('lastProtectedRoute') || '/order';

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (
      user &&
      (user.email === identifier || user.phone === identifier) &&
      user.password === password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      login();
      navigate(redirectTo);
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleReset = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && (user.email === identifier || user.phone === identifier)) {
      const newPass = prompt('Enter a new password:');
      if (newPass) {
        user.password = newPass;
        localStorage.setItem('user', JSON.stringify(user));
        alert('Password reset successful!');
      }
    } else {
      alert('User not found.');
    }
  };

  

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Phone"
            required
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p style={{ marginTop: '1rem' }}>
            <button type="button" onClick={handleReset} style={{ background: 'none', border: 'none', color: '#f2b632', cursor: 'pointer' }}>
              Forgot Password?
            </button>
          </p>
        </form>
      </div>

      <div className="auth-right">
        <h1>Welcome Back</h1>
        <p>Manage your deliveries, check order status, and connect directly via WhatsApp.</p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AuthForm.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [agree, setAgree] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  const generateSignupCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSignupCode(code);
    setCodeSent(true);
    alert(`Your signup code is: ${code} (Simulating SMS send)`); // simulate SMS
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert("Passwords do not match.");
    if (!agree) return alert("Please agree to the terms and conditions.");
    if (userInputCode !== signupCode) return alert("Invalid signup code.");

    const user = { email, phone, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="tel" placeholder="Phone Number" required onChange={(e) => setPhone(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />

          {!codeSent ? (
            <button type="button" onClick={generateSignupCode}>Send Signup Code</button>
          ) : (
            <>
              <input type="text" placeholder="Enter Signup Code" required onChange={(e) => setUserInputCode(e.target.value)} />
            </>
          )}

          <label>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> I agree to the Terms & Conditions
          </label>

          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="auth-right">
        <h1>FreshLink</h1>
        <p>Sign up to unlock smooth logistics and real-time order delivery, powered by your phone.</p>
      </div>
    </div>
  );
}

export default Signup;

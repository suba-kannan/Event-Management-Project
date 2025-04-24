import React, { useState } from 'react';
import './LoginSignup.css';

interface LoginSignupProps {
  onClose: () => void;
  onSignIn: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'User' | 'Organizer';
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onClose, onSignIn }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'User'
  });

  const toggleForm = () => setIsSignup(!isSignup);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isStrongPassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { name, email, password, phone } = formData;

    if (!email || !password) {
      return alert('Please fill in all required fields.');
    }

    if (isSignup) {
      if (!name) return alert('Please enter your full name.');
      if (!phone) return alert('Please enter your phone number.');
      if (!/^\d{10}$/.test(phone)) return alert('Phone number must be 10 digits.');
      if (!isStrongPassword(password)) {
        return alert(
          'Password must be at least 6 characters long and contain at least one letter, one number, and one special character.'
        );
      }
    }

    const BASE_URL = 'http://localhost:5000';
    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("DATA",data);
      

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isSignup) {
        alert('Signup successful! Please login.');
        setIsSignup(false);
      } else {
        const user = {
          token: data.token,
          role: data.role || data.user?.role,
          id: data.id || data.user?.id,
          name: data.name || data.user?.name,
          email: data.user?.email || data.email,
          phone: data.phone || data.user?.phone,
        };
        localStorage.setItem('user', JSON.stringify(user));


        switch (user.role) {
          case 'Organizer':
            window.location.href = '/OrganizerExplore';
            break;
          case 'User':
          default:
            window.location.href = '/UserExplore';
            break;
        }

        onSignIn();
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(error.message);
      } else {
        console.error('Unknown error:', error);
        alert('An unexpected error occurred.');
      }
    }
    
  };

  return (
    <div className="overlay">
      <div className="auth-container">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="auth-header">
          <h2>{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
          <p>{isSignup ? 'Join us and explore amazing events.' : 'Sign in to your account.'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignup && (
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Organizer">Organizer</option>
            </select>
          )}
          <button type="submit" className="auth-action-button">
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="toggle-section">
          {isSignup ? (
            <p>Already have an account? <span onClick={toggleForm}>Sign In</span></p>
          ) : (
            <p>Don't have an account? <span onClick={toggleForm}>Sign Up</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

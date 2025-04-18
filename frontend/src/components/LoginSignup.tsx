// import React, { useState } from 'react';
// import './LoginSignup.css';

// interface LoginSignupProps {
//   onClose: () => void;
//   onSignIn: () => void;
// }

// const LoginSignup: React.FC<LoginSignupProps> = ({ onClose, onSignIn }) => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'User'
//   });

//   const toggleForm = () => setIsSignup(!isSignup);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const BASE_URL = "http://localhost:5000";
//     const url = isSignup ? `${BASE_URL}/api/auth/signup` : `${BASE_URL}/api/auth/login`;
//     const method = 'POST';
  
//     fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),

      
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Response from backend:", data);
//         if (isSignup) {
//           alert('Signup successful! Please login.');
//           setIsSignup(false); 
//         } else if (data.token) {
//           const userInfo = {
//             token: data.token,
//             role: data.role || data.user?.role,
//             id: data.id || data.user?.id,
//             name: data.name || data.user?.name,
//             email: data.user?.email || data.email,
//           };
//           localStorage.setItem('user', JSON.stringify(userInfo));
//           console.log("Full login response:", data);
//           switch (userInfo.role) {
//             case 'Organizer':
//               window.location.href = '/organizer-dashboard';
//               break;
//             case 'User':
//             default:
//               window.location.href = '/user-dashboard';
//               break;
//           }
  
//           onSignIn();
//           onClose();
//         } else {
//           alert(data.message || 'Something went wrong');
//         }
//       })
//       .catch((error) => console.error('Error:', error));
//   };
  
  
  
//     return (
//         <div className="overlay">
//             <div className="auth-container">
//                 <button className="close-button" onClick={onClose}>×</button>
//                 <div className="auth-header">
//                     <h2>{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
//                     <p>{isSignup ? 'Join us and explore amazing events.' : 'Sign in to your account.'}</p>
//                 </div>

//                 <form className="auth-form" onSubmit={handleSubmit}>
//                     {isSignup && (
//                         <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
//                     )}
//                     <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
//                     <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
//                     {isSignup && (
//                       <select name="role" onChange={handleChange}>
//                         <option value="User">User</option>
//                         <option value="Organizer">Organizer</option>
//                       </select>
//                     )}
//                     <button type="submit" className="auth-action-button">
//                         {isSignup ? 'Sign Up' : 'Sign In'}
//                     </button>
//                 </form>

//                 <div className="toggle-section">
//                     {isSignup ? (
//                         <p>Already have an account? <span onClick={toggleForm}>Sign In</span></p>
//                     ) : (
//                         <p>Don't have an account? <span onClick={toggleForm}>Sign Up</span></p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginSignup;
import React, { useState } from 'react';
import './LoginSignup.css';

interface LoginSignupProps {
  onClose: () => void;
  onSignIn: () => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onClose, onSignIn }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User'
  });

  const toggleForm = () => setIsSignup(!isSignup);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const isStrongPassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isSignup && !formData.name) {
      alert('Please enter your full name.');
      return;
    }

    if (isSignup && !isStrongPassword(formData.password)) {
      alert(
        'Password must be at least 6 characters long and contain at least one letter, one number, and one special character.'
      );
      return;
    }

    const BASE_URL = "http://localhost:5000";
    const url = isSignup ? `${BASE_URL}/api/auth/signup` : `${BASE_URL}/api/auth/login`;
    const method = 'POST';
  
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),

      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data);
        if (isSignup) {
          alert('Signup successful! Please login.');
          setIsSignup(false); 
        } else if (data.token) {
          const userInfo = {
            token: data.token,
            role: data.role || data.user?.role,
            id: data.id || data.user?.id,
            name: data.name || data.user?.name,
            email: data.user?.email || data.email,
          };
          localStorage.setItem('user', JSON.stringify(userInfo));
          console.log("Full login response:", data);
          switch (userInfo.role) {
            case 'Organizer':
              window.location.href = '/organizer-dashboard';
              break;
            case 'User':
            default:
              window.location.href = '/user-dashboard';
              break;
          }
  
          onSignIn();
          onClose();
        } else {
          alert(data.message || 'Something went wrong');
        }
      })
      .catch((error) => console.error('Error:', error));
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
                        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                    )}
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    {isSignup && (
                      <select name="role" onChange={handleChange}>
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

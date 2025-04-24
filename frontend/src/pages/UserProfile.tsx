import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import Navbar from '../components/Navbar';

interface User {
  name: string;
  phone: string;
  email: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;
        const token = user.token;
        const response = await axios.get('http://localhost:5000/api/profile/profile', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          phone: response.data.phone,
          email: response.data.email,
          role: response.data.role,

        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const token = user.token;
      const response = await axios.put(
        'http://localhost:5000/api/profile/profile',
        formData,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <div className="user-loading">Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="user-profile-container">
      <h1 className="user-profile-title">Profile 👤</h1>
      {editMode ? (
        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Role:
            <input type="text" name="role" value={formData.role} onChange={handleChange} />
          </label>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      ) : (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      )}
    </div>
    </>
  );
};

export default UserProfile;

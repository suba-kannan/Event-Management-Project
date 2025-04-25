import { Route, Routes } from 'react-router-dom';
import ProfileRedirect from './components/ProfileRedirect';
import Feature from './pages/Feature';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import OrganizerExplore from './pages/OrganizerExplore';
import UserExplore from './pages/UserExplore';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import OrganizerProfile from './pages/OrganizerProfile';

function App() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
  }

  const role = user?.role;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature" element={<Feature />} />

      <Route path="/explore" element={role === 'Organizer' ? <OrganizerExplore /> : <UserExplore />} />

      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <ProfileRedirect destination="explore" />
          </PrivateRoute>
        }
      />

      <Route
        path="/OrganizerExplore"
        element={
          <PrivateRoute allowedRoles={['Organizer']}>
            <OrganizerExplore />
          </PrivateRoute>
        }
      />

      <Route
        path="/UserExplore"
        element={
          <PrivateRoute allowedRoles={['User']}>
            <UserExplore />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProfileRedirect destination="dashboard" />
          </PrivateRoute>
        }
      />

      <Route
        path="/OrganizerDashboard"
        element={
          <PrivateRoute allowedRoles={['Organizer']}>
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/UserDashboard"
        element={
          <PrivateRoute allowedRoles={['User']}>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileRedirect destination="profile" />
          </PrivateRoute>
        }
      />

      <Route
        path="/OrganizerProfile"
        element={
          <PrivateRoute allowedRoles={['Organizer']}>
            <OrganizerProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/UserProfile"
        element={
          <PrivateRoute allowedRoles={['User']}>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
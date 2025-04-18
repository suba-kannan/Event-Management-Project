import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ExploreEvents from './components/ExploreEvents';
import OrganizerDashboard from './pages/OrganizerDashboard';
import UserDashboard from './pages/UserDashboard';
import ProfileRedirect from './components/ProfileRedirect';
import OrganizerProfilePage from './pages/OrganizerProfilePage';
import Feature from './pages/Feature';
import UserProfilePage from './pages/UserProfilePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/explore" element={<ExploreEvents />} />
      <Route path="/feature" element={<Feature />} />
      
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProfileRedirect destination="dashboard" />
          </PrivateRoute>
        }
      />

      <Route
        path="/organizer-dashboard"
        element={
          <PrivateRoute allowedRoles={['Organizer']}>
            <OrganizerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/user-dashboard"
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
        path="/OrganizerProfilePage"
        element={
          <PrivateRoute allowedRoles={['Organizer']}>
            <OrganizerProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/UserProfilePage"
        element={
          <PrivateRoute allowedRoles={['User']}>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

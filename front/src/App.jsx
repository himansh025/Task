import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Logout from './components/Auth/Logout';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={  <Dashboard /> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

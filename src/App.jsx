import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/profile" replace />} />
            
            {/* Dashboard routes based on role */}
            <Route path="dashboard/admin" element={
              <ProtectedRoute roles={['admin']}><Dashboard role="admin" /></ProtectedRoute>
            } />
            <Route path="dashboard/manager" element={
              <ProtectedRoute roles={['manager']}><Dashboard role="manager" /></ProtectedRoute>
            } />
            <Route path="dashboard/user" element={
              <ProtectedRoute roles={['user']}><Dashboard role="user" /></ProtectedRoute>
            } />

            {/* Users management */}
            <Route path="users" element={
              <ProtectedRoute roles={['admin', 'manager']}><UsersList /></ProtectedRoute>
            } />

            {/* Profile */}
            <Route path="profile" element={
              <ProtectedRoute roles={['admin', 'manager', 'user']}><Profile /></ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
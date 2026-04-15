import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0 && !roles.includes(user?.role)) {
    // If user's role is not allowed, redirect them to their specific dashboard
    if (user?.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
    if (user?.role === 'manager') return <Navigate to="/dashboard/manager" replace />;
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
};

export default ProtectedRoute;

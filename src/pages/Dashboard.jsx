import { useAuth } from '../context/AuthContext';
import { Users, Shield, User, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = ({ role }) => {
  const { user } = useAuth();
  
  // Custom dashboard greeting based on role
  const getGreeting = () => {
    if (role === 'admin') return "Here is your administrative overview.";
    if (role === 'manager') return "Here is your team overview.";
    return "Welcome back to your personal space.";
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{user?.name}</span>
          </h1>
          <p className="text-gray-500 mt-2">{getGreeting()}</p>
        </div>
        
        <div className="hidden md:flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className={`p-2.5 rounded-xl ${role === 'admin' ? 'bg-red-100 text-red-600' : role === 'manager' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
            {role === 'admin' && <Shield size={22} />}
            {role === 'manager' && <Users size={22} />}
            {role === 'user' && <User size={22} />}
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-0.5">Current Role</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{role}</p>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-500 font-semibold">Profile Status</h3>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
              <Activity size={24} />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-gray-900">Active</div>
          <div className="text-sm text-emerald-500 mt-3 font-semibold flex items-center gap-1 bg-emerald-50 w-max px-2.5 py-1 rounded-lg">
            + 100% Health
          </div>
        </div>

        {(role === 'admin' || role === 'manager') && (
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-3xl shadow-xl shadow-indigo-600/20 text-white relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-indigo-100 font-semibold text-lg">User Management</h3>
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Users size={20} className="text-white" />
                </div>
              </div>
              <p className="text-indigo-100/90 text-sm mb-6 leading-relaxed">Manage roles, permissions, and access for your organization's members.</p>
            </div>
            <Link to="/users" className="relative z-10 bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-5 rounded-xl transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center w-max text-sm group/btn">
              View Directory <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, UserCircle, LogOut, LayoutDashboard, MoreVertical, X } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: `/dashboard/${user?.role}`, icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/profile', icon: <UserCircle size={20} /> },
  ];

  if (user?.role === 'admin' || user?.role === 'manager') {
    navLinks.splice(1, 0, { name: 'Users', path: '/users', icon: <Users size={20} /> });
  }

  return (
    <div className="flex h-screen bg-[#F5F5F5] font-sans text-[#1A1A1A] overflow-hidden">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-[#121212] flex flex-col transition-transform duration-300 shadow-2xl shadow-indigo-900/20 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="p-6 tracking-wide flex items-center justify-between border-b border-[#2A2A2A] bg-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white text-lg font-bold">Q</span>
            </div>
            {/* <span className="text-white font-bold text-2xl tracking-tight">Q</span> */}
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <div className="text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-4 px-3">
            Menu
          </div>
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path) && link.path !== '/users' || (location.pathname === '/users' && link.path === '/users');
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
                  }`}
              >
                <div className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>
                  {link.icon}
                </div>
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-white leading-none truncate">{user?.name}</span>
              <span className="text-xs text-indigo-400 mt-1 capitalize font-medium">{user?.role}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F5F5F5] relative flex flex-col h-screen">

        {/* Mobile Header Menu Button (Three Dots) */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm border-b border-gray-100 z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold"></span>
            </div>
            <span className="font-bold text-gray-900 tracking-tight"></span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors shadow-sm"
            aria-label="Open Menu"
          >
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-100/50 to-transparent pointer-events-none hidden md:block" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto relative z-10 w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

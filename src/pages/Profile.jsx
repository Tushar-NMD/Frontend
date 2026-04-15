import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { User, Mail, Lock, CheckCircle2, Activity, Save, AlertCircle } from 'lucide-react';

const Profile = () => {
  const { user: authUser, setUser: setAuthUser } = useAuth();

  const [profile, setProfile] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Use useEffect to fetch detailed info if needed, but we can also use authUser initially
  useEffect(() => {
    setProfile({
      name: authUser?.name || '',
      email: authUser?.email || ''
    });
  }, [authUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = { name: profile.name, email: profile.email };
      if (password) payload.password = password;

      // According to STEP 5 requirements: PUT /api/users/me
      const res = await API.put('/users/me', payload);

      // Update local context
      const updatedUser = { ...authUser, name: profile.name, email: profile.email };
      setAuthUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setPassword('');

    } catch (err) {
      // Fallback if /users/me fails, try /users/:id route
      if (err.response?.status === 404 && authUser?._id) {
        try {
          const payload = { name: profile.name, email: profile.email };
          if (password) payload.password = password;
          await API.put(`/users/${authUser._id || authUser.id}`, payload);

          const updatedUser = { ...authUser, name: profile.name, email: profile.email };
          setAuthUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setMessage({ type: 'success', text: 'Profile updated successfully.' });
          setPassword('');
        } catch (fallbackErr) {
          setMessage({ type: 'error', text: fallbackErr.response?.data?.message || 'Failed to update profile' });
        }
      } else {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
      }
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 4000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in relative z-10">
      <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full pointer-events-none" />
        <div className="relative z-10 flex gap-6 items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/20 border-4 border-white">
            {authUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Profile</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              Welcome to your personal settings
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 p-6 bg-gray-50/50 flex items-center gap-3">
          <User className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-8">
          {message.text && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 font-medium transition-all ${message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
              {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide mb-4">Security</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Change Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium placeholder-gray-400"
                      placeholder="Enter new password (optional)"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Leave this blank if you don't want to change your password.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-xl shadow-gray-900/20 transition-all flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} className="group-hover:scale-110 transition-transform" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

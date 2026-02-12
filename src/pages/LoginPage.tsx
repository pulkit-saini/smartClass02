import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { User, UserRole } from '@/types';
import { Shield, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: role === 'ADMIN' ? 'State Admin' : role === 'DISTRICT_OFFICER' ? 'District Officer' : 'Block Officer',
        email,
        role,
        avatar: '',
      };

      login(user);
      setLoading(false);
      navigate('/command-center');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gov-primary via-gov-secondary to-gov-accent flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 h-20 bg-white shadow-md flex items-center px-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gov-primary rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Uttarakhand Government</h1>
            <p className="text-sm text-gray-600">Smart Education Monitoring Dashboard</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-20">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gov-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Login</h2>
            <p className="text-gray-600">Access the Command Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-primary focus:border-transparent outline-none transition"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-primary focus:border-transparent outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 inline mr-2" />
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-primary focus:border-transparent outline-none transition"
              >
                <option value="ADMIN">State Admin</option>
                <option value="DISTRICT_OFFICER">District Officer</option>
                <option value="BLOCK_OFFICER">Block Officer</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gov-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Government of Uttarakhand | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

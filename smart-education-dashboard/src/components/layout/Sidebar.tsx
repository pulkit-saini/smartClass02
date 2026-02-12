import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/store';
import {
  LayoutDashboard,
  MapPin,
  School,
  Activity,
  Settings,
  HelpCircle,
} from 'lucide-react';

export default function Sidebar() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  const navItems = [
    { to: '/command-center', icon: LayoutDashboard, label: 'Command Center' },
    { to: '/districts', icon: MapPin, label: 'Districts & Blocks' },
    { to: '/command-center', icon: School, label: 'All Schools' },
    { to: '/command-center', icon: Activity, label: 'Live Monitoring' },
    { to: '/command-center', icon: Settings, label: 'Settings' },
    { to: '/command-center', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}
    >
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gov-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="bg-gov-light p-4 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-600">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

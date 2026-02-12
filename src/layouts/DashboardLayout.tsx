import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAppStore } from '@/store';

export default function DashboardLayout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-0'
          } mt-16 p-6`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

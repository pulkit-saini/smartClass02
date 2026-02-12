import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import LoginPage from '@/pages/LoginPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import CommandCenter from '@/pages/CommandCenter';
import DistrictSelection from '@/pages/DistrictSelection';
import BlockSelection from '@/pages/BlockSelection';
import SchoolSelection from '@/pages/SchoolSelection';
import SchoolDashboard from '@/pages/SchoolDashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/command-center" replace />} />
        <Route path="command-center" element={<CommandCenter />} />
        <Route path="districts" element={<DistrictSelection />} />
        <Route path="districts/:districtId/blocks" element={<BlockSelection />} />
        <Route path="districts/:districtId/blocks/:blockId/schools" element={<SchoolSelection />} />
        <Route path="schools/:schoolId" element={<SchoolDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

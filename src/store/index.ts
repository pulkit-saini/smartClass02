import { create } from 'zustand';
import { User, District, School, Alert } from '@/types';

interface AppState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Navigation
  selectedDistrict: District | null;
  selectedBlock: string | null;
  selectedSchool: School | null;
  setSelectedDistrict: (district: District | null) => void;
  setSelectedBlock: (blockId: string | null) => void;
  setSelectedSchool: (school: School | null) => void;

  // Alerts
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Authentication
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, selectedDistrict: null, selectedBlock: null, selectedSchool: null }),

  // Navigation
  selectedDistrict: null,
  selectedBlock: null,
  selectedSchool: null,
  setSelectedDistrict: (district) => set({ selectedDistrict: district, selectedBlock: null, selectedSchool: null }),
  setSelectedBlock: (blockId) => set({ selectedBlock: blockId, selectedSchool: null }),
  setSelectedSchool: (school) => set({ selectedSchool: school }),

  // Alerts
  alerts: [],
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  acknowledgeAlert: (alertId) => set((state) => ({
    alerts: state.alerts.map((alert) =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ),
  })),
  clearAlerts: () => set({ alerts: [] }),

  // UI State
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

// User Roles
export type UserRole = 'ADMIN' | 'DISTRICT_OFFICER' | 'BLOCK_OFFICER' | 'VIEWER';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  district?: string;
  block?: string;
  avatar?: string;
}

// Geographic Entities
export interface District {
  id: string;
  name: string;
  blocks: Block[];
  stats: DistrictStats;
}

export interface Block {
  id: string;
  name: string;
  districtId: string;
  schools: School[];
  stats: BlockStats;
}

export interface School {
  id: string;
  name: string;
  udiseCode: string;
  blockId: string;
  districtId: string;
  address: string;
  latitude: number;
  longitude: number;
  status: 'ONLINE' | 'OFFLINE' | 'INACTIVE';
  infrastructure: Infrastructure;
  devices: Device[];
  lastSync: string;
  lastActivity: string;
}

// Statistics
export interface DistrictStats {
  totalSchools: number;
  onlineSchools: number;
  offlineSchools: number;
  totalDevices: number;
  activeDevices: number;
  infrastructureScore: number;
}

export interface BlockStats {
  totalSchools: number;
  onlineSchools: number;
  offlineSchools: number;
  totalDevices: number;
  activeDevices: number;
  infrastructureScore: number;
}

// Infrastructure
export interface Infrastructure {
  smartClassroom: boolean;
  internetStatus: boolean;
  powerStatus: boolean;
  deviceInstallationStatus: boolean;
  hardwareCondition: 'GOOD' | 'FAIR' | 'POOR';
  healthScore: number;
  issues: InfrastructureIssue[];
}

export interface InfrastructureIssue {
  id: string;
  type: string;
  description: string;
  reportedDate: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  images?: string[];
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Devices
export interface Device {
  id: string;
  name: string;
  type: 'IFT' | 'AIO' | 'PROJECTOR' | 'OTHER';
  status: 'ONLINE' | 'OFFLINE' | 'ERROR';
  schoolId: string;
  installDate: string;
  lastRestart: string;
  usage: DeviceUsage;
  health: DeviceHealth;
}

export interface DeviceUsage {
  dailyHours: number;
  weeklyHours: number;
  monthlyHours: number;
  idleTime: number;
  activeTime: number;
  timeline: UsageTimeline[];
}

export interface UsageTimeline {
  date: string;
  hours: number;
  status: 'ACTIVE' | 'IDLE' | 'OFF';
}

export interface DeviceHealth {
  overallStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  temperature?: number;
  errors: ErrorLog[];
  offlineDuration: number;
}

export interface ErrorLog {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

// Application Usage
export interface AppUsage {
  schoolId: string;
  deviceId: string;
  date: string;
  apps: AppUsageDetail[];
  totalScreenTime: number;
  educationalPercentage: number;
  nonEducationalPercentage: number;
}

export interface AppUsageDetail {
  name: string;
  category: 'EDUCATIONAL' | 'NON_EDUCATIONAL';
  icon: string;
  duration: number;
  percentage: number;
  launches: number;
}

// Communication
export interface BroadcastMessage {
  id: string;
  type: 'TEXT' | 'PDF' | 'AUDIO' | 'IMAGE' | 'VIDEO';
  title: string;
  content: string;
  fileUrl?: string;
  sender: string;
  recipients: string[]; // School IDs
  sentAt: string;
  priority: 'NORMAL' | 'HIGH' | 'EMERGENCY';
  status: 'SENT' | 'DELIVERED' | 'READ';
}

export interface CameraAccess {
  schoolId: string;
  deviceId: string;
  streamUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastAccessed: string;
  authorizedUsers: string[];
}

// User Activity
export interface UserActivity {
  userId: string;
  userName: string;
  role: UserRole;
  loginTime: string;
  logoutTime?: string;
  sessionDuration?: number;
  actionsPerformed: number;
  schoolsAccessed: string[];
  ipAddress?: string;
}

// Alerts
export interface Alert {
  id: string;
  type: 'DEVICE_FAILURE' | 'INTERNET_FAILURE' | 'POWER_OUTAGE' | 'UNUSUAL_USAGE' | 'SECURITY';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  schoolId: string;
  schoolName: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  resolvedAt?: string;
}

// Dashboard Data
export interface DashboardData {
  overview: {
    totalSchools: number;
    onlineSchools: number;
    offlineSchools: number;
    inactiveSchools: number;
    totalDevices: number;
    activeDevices: number;
    criticalAlerts: number;
    averageInfrastructureScore: number;
  };
  recentActivity: UserActivity[];
  activeAlerts: Alert[];
  schoolsMap: School[];
}

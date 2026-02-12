import { District, School, Alert, DashboardData, AppUsage, UserActivity, Device } from '@/types';

// Mock Districts Data
export const mockDistricts: District[] = [
  {
    id: 'dist-1',
    name: 'Dehradun',
    blocks: [
      {
        id: 'block-1',
        name: 'Vikasnagar',
        districtId: 'dist-1',
        schools: [],
        stats: {
          totalSchools: 45,
          onlineSchools: 38,
          offlineSchools: 7,
          totalDevices: 180,
          activeDevices: 152,
          infrastructureScore: 85,
        },
      },
      {
        id: 'block-2',
        name: 'Rishikesh',
        districtId: 'dist-1',
        schools: [],
        stats: {
          totalSchools: 52,
          onlineSchools: 45,
          offlineSchools: 7,
          totalDevices: 208,
          activeDevices: 178,
          infrastructureScore: 88,
        },
      },
    ],
    stats: {
      totalSchools: 150,
      onlineSchools: 127,
      offlineSchools: 23,
      totalDevices: 600,
      activeDevices: 508,
      infrastructureScore: 86,
    },
  },
  {
    id: 'dist-2',
    name: 'Haridwar',
    blocks: [
      {
        id: 'block-3',
        name: 'Roorkee',
        districtId: 'dist-2',
        schools: [],
        stats: {
          totalSchools: 38,
          onlineSchools: 32,
          offlineSchools: 6,
          totalDevices: 152,
          activeDevices: 128,
          infrastructureScore: 82,
        },
      },
    ],
    stats: {
      totalSchools: 120,
      onlineSchools: 102,
      offlineSchools: 18,
      totalDevices: 480,
      activeDevices: 408,
      infrastructureScore: 84,
    },
  },
  {
    id: 'dist-3',
    name: 'Nainital',
    blocks: [
      {
        id: 'block-4',
        name: 'Haldwani',
        districtId: 'dist-3',
        schools: [],
        stats: {
          totalSchools: 42,
          onlineSchools: 36,
          offlineSchools: 6,
          totalDevices: 168,
          activeDevices: 144,
          infrastructureScore: 87,
        },
      },
    ],
    stats: {
      totalSchools: 110,
      onlineSchools: 95,
      offlineSchools: 15,
      totalDevices: 440,
      activeDevices: 380,
      infrastructureScore: 85,
    },
  },
];

// Mock Schools Data
export const mockSchools: School[] = [
  {
    id: 'school-1',
    name: 'Government Inter College, Vikasnagar',
    udiseCode: 'UK-05-01-12345',
    blockId: 'block-1',
    districtId: 'dist-1',
    address: 'Main Road, Vikasnagar, Dehradun - 248198',
    latitude: 30.4697,
    longitude: 77.7724,
    status: 'ONLINE',
    lastSync: new Date().toISOString(),
    lastActivity: new Date(Date.now() - 300000).toISOString(),
    infrastructure: {
      smartClassroom: true,
      internetStatus: true,
      powerStatus: true,
      deviceInstallationStatus: true,
      hardwareCondition: 'GOOD',
      healthScore: 92,
      issues: [],
    },
    devices: [],
  },
  {
    id: 'school-2',
    name: 'Government Primary School, Rishikesh',
    udiseCode: 'UK-05-02-23456',
    blockId: 'block-2',
    districtId: 'dist-1',
    address: 'Tapovan Road, Rishikesh, Dehradun - 249201',
    latitude: 30.0869,
    longitude: 78.2676,
    status: 'OFFLINE',
    lastSync: new Date(Date.now() - 7200000).toISOString(),
    lastActivity: new Date(Date.now() - 7200000).toISOString(),
    infrastructure: {
      smartClassroom: true,
      internetStatus: false,
      powerStatus: true,
      deviceInstallationStatus: true,
      hardwareCondition: 'FAIR',
      healthScore: 65,
      issues: [
        {
          id: 'issue-1',
          type: 'INTERNET',
          description: 'Internet connection down since morning',
          reportedDate: new Date(Date.now() - 28800000).toISOString(),
          status: 'OPEN',
          priority: 'HIGH',
        },
      ],
    },
    devices: [],
  },
  {
    id: 'school-3',
    name: 'Government Secondary School, Roorkee',
    udiseCode: 'UK-06-03-34567',
    blockId: 'block-3',
    districtId: 'dist-2',
    address: 'Civil Lines, Roorkee, Haridwar - 247667',
    latitude: 29.8543,
    longitude: 77.8880,
    status: 'ONLINE',
    lastSync: new Date().toISOString(),
    lastActivity: new Date(Date.now() - 180000).toISOString(),
    infrastructure: {
      smartClassroom: true,
      internetStatus: true,
      powerStatus: true,
      deviceInstallationStatus: true,
      hardwareCondition: 'GOOD',
      healthScore: 88,
      issues: [],
    },
    devices: [],
  },
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Smart Panel - Classroom A',
    type: 'IFT',
    status: 'ONLINE',
    schoolId: 'school-1',
    installDate: '2023-06-15',
    lastRestart: new Date(Date.now() - 86400000).toISOString(),
    usage: {
      dailyHours: 6.5,
      weeklyHours: 32.5,
      monthlyHours: 130,
      idleTime: 1.5,
      activeTime:      5.0,
      timeline: [
        { date: '2024-02-12', hours: 6.5, status: 'ACTIVE' },
        { date: '2024-02-11', hours: 7.0, status: 'ACTIVE' },
        { date: '2024-02-10', hours: 5.5, status: 'ACTIVE' },
      ],
    },
    health: {
      overallStatus: 'HEALTHY',
      temperature: 45,
      errors: [],
      offlineDuration: 0,
    },
  },
  {
    id: 'device-2',
    name: 'AIO Computer - Lab',
    type: 'AIO',
    status: 'ONLINE',
    schoolId: 'school-1',
    installDate: '2023-06-15',
    lastRestart: new Date(Date.now() - 172800000).toISOString(),
    usage: {
      dailyHours: 5.0,
      weeklyHours: 25.0,
      monthlyHours: 100,
      idleTime: 2.0,
      activeTime: 3.0,
      timeline: [
        { date: '2024-02-12', hours: 5.0, status: 'ACTIVE' },
        { date: '2024-02-11', hours: 6.0, status: 'ACTIVE' },
        { date: '2024-02-10', hours: 4.5, status: 'ACTIVE' },
      ],
    },
    health: {
      overallStatus: 'HEALTHY',
      errors: [],
      offlineDuration: 0,
    },
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'INTERNET_FAILURE',
    severity: 'CRITICAL',
    schoolId: 'school-2',
    schoolName: 'Government Primary School, Rishikesh',
    message: 'Internet connection lost for more than 2 hours',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    type: 'DEVICE_FAILURE',
    severity: 'WARNING',
    schoolId: 'school-3',
    schoolName: 'Government Secondary School, Roorkee',
    message: 'Device temperature above normal range',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
  },
];

// Mock Dashboard Data
export const mockDashboardData: DashboardData = {
  overview: {
    totalSchools: 380,
    onlineSchools: 324,
    offlineSchools: 56,
    inactiveSchools: 12,
    totalDevices: 1520,
    activeDevices: 1296,
    criticalAlerts: 8,
    averageInfrastructureScore: 85,
  },
  recentActivity: [],
  activeAlerts: mockAlerts,
  schoolsMap: mockSchools,
};

// Mock App Usage
export const mockAppUsage: AppUsage = {
  schoolId: 'school-1',
  deviceId: 'device-1',
  date: new Date().toISOString(),
  apps: [
    {
      name: 'Smart Learning App',
      category: 'EDUCATIONAL',
      icon: '📚',
      duration: 180,
      percentage: 45,
      launches: 12,
    },
    {
      name: 'YouTube EDU',
      category: 'EDUCATIONAL',
      icon: '🎥',
      duration: 80,
      percentage: 20,
      launches: 8,
    },
    {
      name: 'Chrome Browser',
      category: 'EDUCATIONAL',
      icon: '🌐',
      duration: 60,
      percentage: 15,
      launches: 15,
    },
    {
      name: 'Google Classroom',
      category: 'EDUCATIONAL',
      icon: '📖',
      duration: 40,
      percentage: 10,
      launches: 5,
    },
    {
      name: 'Other Apps',
      category: 'NON_EDUCATIONAL',
      icon: '📱',
      duration: 40,
      percentage: 10,
      launches: 6,
    },
  ],
  totalScreenTime: 400,
  educationalPercentage: 90,
  nonEducationalPercentage: 10,
};

// Mock User Activity
export const mockUserActivity: UserActivity[] = [
  {
    userId: 'user-1',
    userName: 'Rajesh Kumar',
    role: 'DISTRICT_OFFICER',
    loginTime: new Date(Date.now() - 7200000).toISOString(),
    sessionDuration: 125,
    actionsPerformed: 45,
    schoolsAccessed: ['school-1', 'school-2', 'school-3'],
  },
  {
    userId: 'user-2',
    userName: 'Priya Sharma',
    role: 'BLOCK_OFFICER',
    loginTime: new Date(Date.now() - 3600000).toISOString(),
    sessionDuration: 60,
    actionsPerformed: 28,
    schoolsAccessed: ['school-1', 'school-2'],
  },
];

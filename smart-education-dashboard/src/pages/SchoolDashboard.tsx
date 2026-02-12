import { useParams, useNavigate } from 'react-router-dom';
import { mockSchools, mockDevices, mockAppUsage, mockUserActivity } from '@/data/mockData';
import { ChevronLeft, MapPin, Wifi, WifiOff, Power, CheckCircle, XCircle, AlertTriangle, Upload, Monitor, Activity, BarChart3, Video, Send, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

export default function SchoolDashboard() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const school = mockSchools.find((s) => s.id === schoolId);
  const devices = mockDevices.filter((d) => d.schoolId === schoolId);
  const appUsage = mockAppUsage;
  const userActivity = mockUserActivity;
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!school) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-xl text-gray-600">School not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'apps', label: 'App Usage', icon: BarChart3 },
    { id: 'communication', label: 'Communication', icon: Send },
    { id: 'users', label: 'User Activity', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gov-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* School Identity Header */}
      <div className="card bg-gradient-to-r from-gov-primary to-gov-secondary text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold">{school.name}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${
                school.status === 'ONLINE' ? 'bg-green-500' :
                school.status === 'OFFLINE' ? 'bg-red-500' : 'bg-gray-500'
              }`}>
                {school.status === 'ONLINE' ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                {school.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-blue-100 mb-1">UDISE Code</p>
                <p className="font-semibold text-lg">{school.udiseCode}</p>
              </div>
              <div>
                <p className="text-blue-100 mb-1">Address</p>
                <p className="font-semibold">{school.address.split(',')[0]}</p>
              </div>
              <div>
                <p className="text-blue-100 mb-1">Last Sync</p>
                <p className="font-semibold">{format(new Date(school.lastSync), 'HH:mm:ss')}</p>
              </div>
              <div>
                <p className="text-blue-100 mb-1">Infrastructure Score</p>
                <p className="font-semibold text-2xl">{school.infrastructure.healthScore}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors border-b-2 ${
                  selectedTab === tab.id
                    ? 'border-gov-primary text-gov-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && <OverviewTab school={school} />}
      {selectedTab === 'devices' && <DevicesTab devices={devices} />}
      {selectedTab === 'apps' && <AppUsageTab appUsage={appUsage} />}
      {selectedTab === 'communication' && <CommunicationTab school={school} />}
      {selectedTab === 'users' && <UserActivityTab userActivity={userActivity} />}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ school }: { school: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Geo-Location Map */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gov-primary" />
          Geo-Location
        </h3>
        <div className="h-[300px] rounded-lg overflow-hidden">
          <MapContainer
            center={[school.latitude, school.longitude]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[school.latitude, school.longitude]}>
              <Popup>
                <div className="p-2">
                  <p className="font-semibold">{school.name}</p>
                  <p className="text-xs">{school.address}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Latitude:</span>
            <span className="font-semibold">{school.latitude}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Longitude:</span>
            <span className="font-semibold">{school.longitude}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Full Address:</span>
            <span className="font-semibold text-right">{school.address}</span>
          </div>
        </div>
      </div>

      {/* Infrastructure Status */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-gov-success" />
          Infrastructure Status
        </h3>
        <div className="space-y-4">
          <InfraStatusItem
            label="Smart Classroom"
            status={school.infrastructure.smartClassroom}
            icon={<Monitor className="w-5 h-5" />}
          />
          <InfraStatusItem
            label="Internet Connection"
            status={school.infrastructure.internetStatus}
            icon={<Wifi className="w-5 h-5" />}
          />
          <InfraStatusItem
            label="Power Supply"
            status={school.infrastructure.powerStatus}
            icon={<Power className="w-5 h-5" />}
          />
          <InfraStatusItem
            label="Device Installation"
            status={school.infrastructure.deviceInstallationStatus}
            icon={<Monitor className="w-5 h-5" />}
          />

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Hardware Condition</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                school.infrastructure.hardwareCondition === 'GOOD' ? 'bg-green-100 text-green-700' :
                school.infrastructure.hardwareCondition === 'FAIR' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {school.infrastructure.hardwareCondition}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Infrastructure Health Score</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ width: `${school.infrastructure.healthScore}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-800">{school.infrastructure.healthScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Issues */}
        {school.infrastructure.issues.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Active Issues ({school.infrastructure.issues.length})
            </h4>
            <div className="space-y-3">
              {school.infrastructure.issues.map((issue: any) => (
                <div key={issue.id} className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-semibold text-orange-800">{issue.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                      issue.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {issue.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Reported: {format(new Date(issue.reportedDate), 'dd MMM yyyy')}
                    </span>
                    <button className="text-xs bg-white px-3 py-1 rounded border border-orange-300 hover:bg-orange-50">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Devices Tab Component
function DevicesTab({ devices }: { devices: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-blue-50">
          <p className="text-sm text-blue-600 mb-1">Total Devices</p>
          <p className="text-3xl font-bold text-blue-700">{devices.length}</p>
        </div>
        <div className="card bg-green-50">
          <p className="text-sm text-green-600 mb-1">Online</p>
          <p className="text-3xl font-bold text-green-700">
            {devices.filter(d => d.status === 'ONLINE').length}
          </p>
        </div>
        <div className="card bg-yellow-50">
          <p className="text-sm text-yellow-600 mb-1">Avg Daily Usage</p>
          <p className="text-3xl font-bold text-yellow-700">
            {(devices.reduce((sum, d) => sum + d.usage.dailyHours, 0) / devices.length).toFixed(1)}h
          </p>
        </div>
        <div className="card bg-purple-50">
          <p className="text-sm text-purple-600 mb-1">Health Status</p>
          <p className="text-3xl font-bold text-purple-700">
            {devices.filter(d => d.health.overallStatus === 'HEALTHY').length}/{devices.length}
          </p>
        </div>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  device.status === 'ONLINE' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Monitor className={`w-6 h-6 ${
                    device.status === 'ONLINE' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{device.name}</h4>
                  <p className="text-sm text-gray-500">{device.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                device.status === 'ONLINE' ? 'bg-green-100 text-green-700' :
                device.status === 'OFFLINE' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {device.status}
              </span>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500 mb-1">Daily</p>
                <p className="text-lg font-bold text-gray-800">{device.usage.dailyHours}h</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500 mb-1">Weekly</p>
                <p className="text-lg font-bold text-gray-800">{device.usage.weeklyHours}h</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <p className="text-xs text-gray-500 mb-1">Monthly</p>
                <p className="text-lg font-bold text-gray-800">{device.usage.monthlyHours}h</p>
              </div>
            </div>

            {/* Usage Timeline */}
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={device.usage.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'dd MMM')} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="hours" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Last Restart:</span>
                <p className="font-semibold">{format(new Date(device.lastRestart), 'dd MMM HH:mm')}</p>
              </div>
              <div>
                <span className="text-gray-500">Health:</span>
                <p className={`font-semibold ${
                  device.health.overallStatus === 'HEALTHY' ? 'text-green-600' :
                  device.health.overallStatus === 'WARNING' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {device.health.overallStatus}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// App Usage Tab Component
function AppUsageTab({ appUsage }: { appUsage: any }) {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50">
          <p className="text-sm text-blue-600 mb-1">Total Screen Time</p>
          <p className="text-3xl font-bold text-blue-700">{Math.floor(appUsage.totalScreenTime / 60)}h {appUsage.totalScreenTime % 60}m</p>
        </div>
        <div className="card bg-green-50">
          <p className="text-sm text-green-600 mb-1">Educational Usage</p>
          <p className="text-3xl font-bold text-green-700">{appUsage.educationalPercentage}%</p>
        </div>
        <div className="card bg-orange-50">
          <p className="text-sm text-orange-600 mb-1">Non-Educational</p>
          <p className="text-3xl font-bold text-orange-700">{appUsage.nonEducationalPercentage}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Distribution Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">App Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appUsage.apps}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name.split(' ')[0]} ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
                nameKey="name"
              >
                {appUsage.apps.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* App Details List */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Application Details</h3>
          <div className="space-y-3">
            {appUsage.apps.map((app: any) => (
              <div key={app.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{app.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{app.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{Math.floor(app.duration / 60)}h {app.duration % 60}m</span>
                      <span>•</span>
                      <span>{app.launches} launches</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{app.percentage}%</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.category === 'EDUCATIONAL' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {app.category === 'EDUCATIONAL' ? 'EDU' : 'OTHER'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Communication Tab Component
function CommunicationTab({ school }: { school: any }) {
  const [messageType, setMessageType] = useState('TEXT');
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Camera Access */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-gov-primary" />
            Live Camera Access
          </h3>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center text-white">
              <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-75">Camera feed unavailable</p>
              <p className="text-xs opacity-50 mt-1">Secure authorization required</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-primary flex-1">
              Request Camera Access
            </button>
            <button className="btn-secondary">
              View History
            </button>
          </div>
        </div>

        {/* Broadcast Message */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-gov-primary" />
            Send Broadcast Message
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-primary"
              >
                <option value="TEXT">Text Message</option>
                <option value="PDF">PDF Document</option>
                <option value="AUDIO">Audio Message</option>
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>

            {messageType === 'TEXT' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gov-primary"
                  placeholder="Type your message here..."
                />
              </div>
            )}

            {messageType !== 'TEXT' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gov-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">Max file size: 25MB</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex gap-2">
                <button className="px-4 py-2 border-2 border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50">
                  Normal
                </button>
                <button className="px-4 py-2 border-2 border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50">
                  High
                </button>
                <button className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Emergency
                </button>
              </div>
            </div>

            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send to {school.name}
            </button>
          </div>
        </div>
      </div>

      {/* Message History */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Communications</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gov-primary rounded-full flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-800">Important Announcement</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-600">Tomorrow's schedule has been updated. Please check the portal.</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Delivered</span>
                <span className="text-xs text-gray-500">Sent by: State Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Activity Tab Component
function UserActivityTab({ userActivity }: { userActivity: any[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-50">
          <p className="text-sm text-blue-600 mb-1">Total Users</p>
          <p className="text-3xl font-bold text-blue-700">{userActivity.length}</p>
        </div>
        <div className="card bg-green-50">
          <p className="text-sm text-green-600 mb-1">Active Sessions</p>
          <p className="text-3xl font-bold text-green-700">{userActivity.filter(u => !u.logoutTime).length}</p>
        </div>
        <div className="card bg-purple-50">
          <p className="text-sm text-purple-600 mb-1">Avg Session Time</p>
          <p className="text-3xl font-bold text-purple-700">
            {Math.floor(userActivity.reduce((sum, u) => sum + (u.sessionDuration || 0), 0) / userActivity.length)} min
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">User Activity Log</h3>
        <div className="space-y-3">
          {userActivity.map((user) => (
            <div key={user.userId} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gov-primary rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{user.userName}</p>
                    <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Login Time:</span>
                    <p className="font-semibold">{format(new Date(user.loginTime), 'HH:mm')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <p className="font-semibold">{user.sessionDuration} min</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Actions:</span>
                    <p className="font-semibold">{user.actionsPerformed}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    Accessed {user.schoolsAccessed.length} school(s)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper Component
function InfraStatusItem({ label, status, icon }: { label: string; status: boolean; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`${status ? 'text-green-600' : 'text-red-600'}`}>
          {icon}
        </div>
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {status ? (
          <>
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-600">Active</span>
          </>
        ) : (
          <>
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-600">Inactive</span>
          </>
        )}
      </div>
    </div>
  );
}

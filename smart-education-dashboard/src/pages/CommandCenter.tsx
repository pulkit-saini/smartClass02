import { mockDashboardData } from '@/data/mockData';
import {
  School,
  Activity,
  AlertTriangle,
  Monitor,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

export default function CommandCenter() {
  const navigate = useNavigate();
  const { overview, activeAlerts, schoolsMap } = mockDashboardData;

  const statusData = [
    { name: 'Online', value: overview.onlineSchools, color: '#10b981' },
    { name: 'Offline', value: overview.offlineSchools, color: '#ef4444' },
    { name: 'Inactive', value: overview.inactiveSchools, color: '#f59e0b' },
  ];

  const districtData = [
    { name: 'Dehradun', online: 127, offline: 23 },
    { name: 'Haridwar', online: 102, offline: 18 },
    { name: 'Nainital', online: 95, offline: 15 },
  ];

  const weeklyActivityData = [
    { day: 'Mon', active: 320, idle: 40 },
    { day: 'Tue', active: 310, idle: 50 },
    { day: 'Wed', active: 328, idle: 32 },
    { day: 'Thu', active: 315, idle: 45 },
    { day: 'Fri', active: 324, idle: 36 },
    { day: 'Sat', active: 200, idle: 160 },
    { day: 'Sun', active: 150, idle: 210 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Command Center</h1>
          <p className="text-gray-600">Real-time monitoring of all schools across Uttarakhand</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-gray-700">Live</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Schools</p>
              <p className="text-4xl font-bold">{overview.totalSchools}</p>
            </div>
            <School className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Online Schools</p>
              <p className="text-4xl font-bold">{overview.onlineSchools}</p>
              <p className="text-green-100 text-xs mt-1">
                {Math.round((overview.onlineSchools / overview.totalSchools) * 100)}% Active
              </p>
            </div>
            <Activity className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm mb-1">Critical Alerts</p>
              <p className="text-4xl font-bold">{overview.criticalAlerts}</p>
              <p className="text-red-100 text-xs mt-1">Requires Attention</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Active Devices</p>
              <p className="text-4xl font-bold">{overview.activeDevices}</p>
              <p className="text-purple-100 text-xs mt-1">
                of {overview.totalDevices} devices
              </p>
            </div>
            <Monitor className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* School Status Distribution */}
        <div className="card lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4">School Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* District Comparison */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">District-wise School Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="online" fill="#10b981" name="Online" />
              <Bar dataKey="offline" fill="#ef4444" name="Offline" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Trend */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Weekly Activity Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active" />
              <Line type="monotone" dataKey="idle" stroke="#f59e0b" strokeWidth={2} name="Idle" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Alerts */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Active Alerts</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-red-50 border-red-500'
                    : alert.severity === 'WARNING'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          alert.severity === 'CRITICAL'
                            ? 'text-red-600'
                            : alert.severity === 'WARNING'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          alert.severity === 'CRITICAL'
                            ? 'text-red-700'
                            : alert.severity === 'WARNING'
                            ? 'text-yellow-700'
                            : 'text-blue-700'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1">{alert.schoolName}</p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-xs bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schools Map */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Schools Live Map</h3>
        <div className="h-[500px] rounded-lg overflow-hidden">
          <MapContainer
            center={[30.0668, 79.0193]}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {schoolsMap.map((school) => (
              <CircleMarker
                key={school.id}
                center={[school.latitude, school.longitude]}
                radius={8}
                fillColor={school.status === 'ONLINE' ? '#10b981' : school.status === 'OFFLINE' ? '#ef4444' : '#6b7280'}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{
                  click: () => {
                    navigate(`/schools/${school.id}`);
                  },
                }}
              >
                <Popup>
                  <div className="p-2">
                    <p className="font-semibold">{school.name}</p>
                    <p className="text-xs text-gray-600">{school.udiseCode}</p>
                    <p className="text-xs mt-1">
                      Status: <span className={school.status === 'ONLINE' ? 'text-green-600' : 'text-red-600'}>
                        {school.status}
                      </span>
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

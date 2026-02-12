import { useNavigate } from 'react-router-dom';
import { mockDistricts } from '@/data/mockData';
import { ChevronRight, MapPin, School, TrendingUp } from 'lucide-react';

export default function DistrictSelection() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Select District</h1>
        <p className="text-gray-600">Choose a district to view detailed information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDistricts.map((district) => (
          <div
            key={district.id}
            onClick={() => navigate(`/districts/${district.id}/blocks`)}
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gov-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-gov-primary transition-colors">
                    {district.name}
                  </h3>
                  <p className="text-sm text-gray-500">{district.blocks.length} Blocks</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gov-primary transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <School className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Schools</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{district.stats.totalSchools}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-600">Online %</span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round((district.stats.onlineSchools / district.stats.totalSchools) * 100)}%
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Devices:</span>
                <span className="font-semibold text-gray-800">
                  {district.stats.activeDevices} / {district.stats.totalDevices}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Infra Score:</span>
                <span className="font-semibold text-gray-800">{district.stats.infrastructureScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

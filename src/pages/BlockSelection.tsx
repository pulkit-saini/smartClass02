import { useNavigate, useParams } from 'react-router-dom';
import { mockDistricts } from '@/data/mockData';
import { ChevronRight, ChevronLeft, Building2, School, TrendingUp } from 'lucide-react';

export default function BlockSelection() {
  const navigate = useNavigate();
  const { districtId } = useParams();
  const district = mockDistricts.find((d) => d.id === districtId);

  if (!district) {
    return <div>District not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/districts')}
          className="flex items-center gap-2 text-gray-600 hover:text-gov-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Districts</span>
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blocks in {district.name}</h1>
        <p className="text-gray-600">Select a block to view schools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {district.blocks.map((block) => (
          <div
            key={block.id}
            onClick={() => navigate(`/districts/${districtId}/blocks/${block.id}/schools`)}
            className="card hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gov-secondary rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-gov-secondary transition-colors">
                    {block.name}
                  </h3>
                  <p className="text-sm text-gray-500">Block</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gov-secondary transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <School className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Schools</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{block.stats.totalSchools}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-600">Online %</span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {Math.round((block.stats.onlineSchools / block.stats.totalSchools) * 100)}%
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Devices:</span>
                <span className="font-semibold text-gray-800">
                  {block.stats.activeDevices} / {block.stats.totalDevices}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Infra Score:</span>
                <span className="font-semibold text-gray-800">{block.stats.infrastructureScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

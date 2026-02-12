import { useNavigate, useParams } from 'react-router-dom';
import { mockSchools } from '@/data/mockData';
import { ChevronRight, ChevronLeft, MapPin, Circle } from 'lucide-react';
import { format } from 'date-fns';

export default function SchoolSelection() {
  const navigate = useNavigate();
  const { districtId, blockId } = useParams();
  const schools = mockSchools.filter((s) => s.blockId === blockId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/districts/${districtId}/blocks`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gov-primary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Blocks</span>
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Schools</h1>
        <p className="text-gray-600">Select a school to view detailed dashboard</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {schools.map((school) => (
          <div
            key={school.id}
            onClick={() => navigate(`/schools/${school.id}`)}
            className="card hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  school.status === 'ONLINE' ? 'bg-green-100' :
                  school.status === 'OFFLINE' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <MapPin className={`w-6 h-6 ${
                    school.status === 'ONLINE' ? 'text-green-600' :
                    school.status === 'OFFLINE' ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-gov-primary transition-colors">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Circle className={`w-3 h-3 ${
                        school.status === 'ONLINE' ? 'fill-green-500 text-green-500' :
                        school.status === 'OFFLINE' ? 'fill-red-500 text-red-500' :
                        'fill-gray-500 text-gray-500'
                      }`} />
                      <span className={`text-sm font-medium ${
                        school.status === 'ONLINE' ? 'text-green-600' :
                        school.status === 'OFFLINE' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {school.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">UDISE Code:</span>
                      <p className="font-semibold text-gray-800">{school.udiseCode}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Address:</span>
                      <p className="font-semibold text-gray-800">{school.address.split(',')[0]}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Infra Score:</span>
                      <p className="font-semibold text-gray-800">{school.infrastructure.healthScore}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Activity:</span>
                      <p className="font-semibold text-gray-800">
                        {format(new Date(school.lastActivity), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gov-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

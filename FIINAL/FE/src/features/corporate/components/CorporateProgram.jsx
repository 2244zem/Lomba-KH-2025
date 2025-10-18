import React, { useState } from 'react';

const CorporateProgram = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companyStats, setCompanyStats] = useState({
    totalRecycled: 1250, // kg
    co2Reduced: 3200, // kg
    employeesParticipating: 47,
    monthlyGoal: 2000,
    rank: 15
  });

  const [departments, setDepartments] = useState([
    { name: 'IT', recycled: 320, goal: 400, progress: 80 },
    { name: 'Marketing', recycled: 180, goal: 300, progress: 60 },
    { name: 'HR', recycled: 95, goal: 150, progress: 63 },
    { name: 'Finance', recycled: 210, goal: 250, progress: 84 }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { name: 'Ahmad S.', department: 'IT', points: 1250, avatar: '👨' },
    { name: 'Sari W.', department: 'Marketing', points: 980, avatar: '👩' },
    { name: 'Budi P.', department: 'Finance', points: 870, avatar: '👨' },
    { name: 'Dewi K.', department: 'HR', points: 760, avatar: '👩' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Corporate Green Program</h1>
              <p className="text-gray-600 mt-2">PT. Contoh Perusahaan • Program Sustainability</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">#{companyStats.rank}</div>
              <div className="text-gray-600">Rank Perusahaan</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6 border-b border-gray-200">
            {['dashboard', 'departments', 'leaderboard', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'dashboard' ? 'Dashboard' :
                 tab === 'departments' ? 'Departemen' :
                 tab === 'leaderboard' ? 'Leaderboard' : 'Laporan'}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Daur Ulang</p>
                    <p className="text-2xl font-bold text-gray-900">{companyStats.totalRecycled} kg</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">♻️</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Berkurang</p>
                    <p className="text-2xl font-bold text-gray-900">{companyStats.co2Reduced} kg</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">🌍</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Karyawan Aktif</p>
                    <p className="text-2xl font-bold text-gray-900">{companyStats.employeesParticipating}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Target Bulanan</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round((companyStats.totalRecycled / companyStats.monthlyGoal) * 100)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xl">🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Per Departemen</h2>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <span>{dept.recycled} / {dept.goal} kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${dept.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Employee Leaderboard</h2>
            <div className="space-y-4">
              {leaderboard.map((employee, index) => (
                <div key={employee.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-400' :
                      index === 1 ? 'bg-gray-400' :
                      index === 2 ? 'bg-orange-400' : 'bg-green-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{employee.avatar}</span>
                      <div>
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.department}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{employee.points} pts</p>
                    <p className="text-sm text-gray-600">Total Points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSR Impact Report */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg p-8 text-white mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">1.2T</div>
              <div className="opacity-90">Liter Air Dihasilkan</div>
            </div>
            <div>
              <div className="text-3xl font-bold">47</div>
              <div className="opacity-90">Pohon Tertanam</div>
            </div>
            <div>
              <div className="text-3xl font-bold">125</div>
              <div className="opacity-90">Keluarga Terdampak</div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-lg font-semibold">Dampak CSR Perusahaan Anda</p>
            <p className="opacity-90 mt-2">Berkontribusi pada sustainability goals perusahaan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateProgram;
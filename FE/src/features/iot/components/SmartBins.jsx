import React, { useState, useEffect } from 'react';

const SmartBins = () => {
  const [bins, setBins] = useState([
    {
      id: 1,
      location: 'Lobby Utama',
      type: 'plastic',
      fillLevel: 75,
      status: 'warning',
      lastEmptied: '2 jam yang lalu',
      temperature: 25,
      weight: 8.2
    },
    {
      id: 2,
      location: 'Kantin',
      type: 'organic',
      fillLevel: 45,
      status: 'normal',
      lastEmptied: '4 jam yang lalu',
      temperature: 22,
      weight: 5.1
    },
    {
      id: 3,
      location: 'Area Parkir',
      type: 'general',
      fillLevel: 92,
      status: 'critical',
      lastEmptied: '6 jam yang lalu',
      temperature: 28,
      weight: 12.5
    }
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, binId: 3, message: 'Tong sampah hampir penuh', priority: 'high', time: '5 menit lalu' },
    { id: 2, binId: 1, message: 'Suhu meningkat', priority: 'medium', time: '15 menit lalu' }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBins(prev => prev.map(bin => ({
        ...bin,
        fillLevel: Math.min(100, bin.fillLevel + (Math.random() * 2)),
        temperature: bin.temperature + (Math.random() - 0.5)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFillColor = (level) => {
    if (level < 50) return 'bg-green-500';
    if (level < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Bin Monitoring</h1>
              <p className="text-gray-600 mt-2">Monitor tong sampah pintar secara real-time</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{bins.length}</div>
              <div className="text-gray-600">Total Smart Bins</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bins List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Daftar Tong Sampah</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bins.map((bin) => (
                <div key={bin.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{bin.location}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(bin.status)}`}>
                        {bin.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{bin.fillLevel}%</div>
                      <div className="text-sm text-gray-600">Terisi</div>
                    </div>
                  </div>

                  {/* Fill Level Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div 
                      className={`h-4 rounded-full transition-all duration-500 ${getFillColor(bin.fillLevel)}`}
                      style={{ width: `${bin.fillLevel}%` }}
                    ></div>
                  </div>

                  {/* Bin Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Jenis</p>
                      <p className="font-medium capitalize">{bin.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Berat</p>
                      <p className="font-medium">{bin.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Suhu</p>
                      <p className="font-medium">{bin.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Terakhir Kosong</p>
                      <p className="font-medium">{bin.lastEmptied}</p>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                    Request Pengosongan
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Analytics */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Alert Terbaru</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                    alert.priority === 'high' 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-yellow-500 bg-yellow-50'
                  }`}>
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{alert.message}</p>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Bin #{alert.binId}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Analytics Hari Ini</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Sampah Terkumpul</span>
                    <span className="font-medium">25.8 kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Rata-rata Pengisian</span>
                    <span className="font-medium">71%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Efisiensi Pengosongan</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                  Generate Collection Route
                </button>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600">
                  Download Report
                </button>
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600">
                  System Diagnostics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartBins;
import React, { useState, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const WasteTracking = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [wasteData, setWasteData] = useState({
    type: '',
    weight: '',
    items: [],
    location: '',
    status: 'scheduled'
  });
  const [qrCode, setQrCode] = useState('');
  const fileInputRef = useRef(null);

  const wasteTypes = [
    { id: 'plastic', name: 'Plastik', price: 5000, color: 'bg-blue-100 text-blue-800' },
    { id: 'paper', name: 'Kertas', price: 3000, color: 'bg-amber-100 text-amber-800' },
    { id: 'metal', name: 'Logam', price: 8000, color: 'bg-gray-100 text-gray-800' },
    { id: 'glass', name: 'Kaca', price: 2000, color: 'bg-green-100 text-green-800' },
    { id: 'electronic', name: 'Elektronik', price: 15000, color: 'bg-purple-100 text-purple-800' }
  ];

  const generateQRCode = () => {
    const code = `ECO-${Date.now()}-${user.id}`;
    setQrCode(code);
    setWasteData(prev => ({ ...prev, trackingCode: code }));
  };

  const handleWasteTypeSelect = (type) => {
    setWasteData(prev => ({ ...prev, type }));
    setCurrentStep(2);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate image processing
      const reader = new FileReader();
      reader.onload = (e) => {
        setWasteData(prev => ({ 
          ...prev, 
          image: e.target.result,
          estimatedWeight: '2.5 kg' // AI estimation simulation
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const schedulePickup = () => {
    generateQRCode();
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lacak Sampah Digital</h1>
          <p className="text-gray-600 mb-8">Kelola sampah Anda dengan teknologi modern</p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step <= currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {['Pilih Jenis', 'Upload Foto', 'Jadwalkan', 'QR Code'][step-1]}
                </span>
              </div>
            ))}
          </div>

          {/* Step 1: Waste Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Pilih Jenis Sampah</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wasteTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleWasteTypeSelect(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      wasteData.type === type.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${type.color}`}>
                      {type.name}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      Rp {type.price.toLocaleString()}/kg
                    </p>
                    <p className="text-gray-600 text-sm mt-1">Harga per kilogram</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Image Upload & AI Analysis */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Upload Foto Sampah</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                {!wasteData.image ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📸</span>
                    </div>
                    <p className="text-lg font-medium text-gray-900">Upload Foto Sampah</p>
                    <p className="text-gray-600 mt-1">AI akan menganalisis jenis dan memperkirakan berat</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={wasteData.image} 
                      alt="Uploaded waste" 
                      className="max-w-xs mx-auto rounded-lg"
                    />
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="font-medium text-green-800">✅ Analisis AI Selesai</p>
                      <p className="text-green-700">Estimasi berat: {wasteData.estimatedWeight}</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600"
                    >
                      Lanjutkan ke Penjadwalan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Schedule Pickup */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Jadwalkan Penjemputan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Penjemputan
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Waktu
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option>08:00 - 10:00</option>
                    <option>10:00 - 12:00</option>
                    <option>13:00 - 15:00</option>
                    <option>15:00 - 17:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Penjemputan
                </label>
                <textarea
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan alamat lengkap untuk penjemputan..."
                ></textarea>
              </div>

              <button
                onClick={schedulePickup}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600"
              >
                Buat Jadwal Penjemputan
              </button>
            </div>
          )}

          {/* Step 4: QR Code & Tracking */}
          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl font-semibold">QR Code Penjemputan</h2>
              
              <div className="bg-white p-8 rounded-2xl border-2 border-green-200 inline-block">
                <div className="bg-green-500 text-white px-4 py-2 rounded-t-lg font-medium">
                  KODE: {qrCode}
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 m-4">
                  {/* QR Code Placeholder */}
                  <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">[QR Code: {qrCode}]</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">Tunjukkan QR ini ke petugas penjemput</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold mb-4">Status Penjemputan</h3>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-sm">Terjadwal</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-sm">Dalam Perjalanan</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-sm">Terkumpul</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-gray-300 rounded-full mx-auto mb-1"></div>
                    <span className="text-sm">Selesai</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteTracking;
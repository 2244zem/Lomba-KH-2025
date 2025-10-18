import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceholderPage = ({ title, icon, description }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Kembali</span>
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-8xl mb-6">{icon}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>
          
          <div className="inline-block bg-blue-50 rounded-2xl px-6 py-4">
            <p className="text-blue-800 font-semibold">
              🚧 Halaman ini sedang dalam pengembangan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;

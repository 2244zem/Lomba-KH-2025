import React, { useState, useEffect } from 'react';

const SmartPricing = () => {
  const [marketData, setMarketData] = useState({
    plastic: { price: 5200, trend: 'up', change: 3.2 },
    paper: { price: 3100, trend: 'down', change: -1.5 },
    metal: { price: 8200, trend: 'up', change: 5.7 },
    glass: { price: 2100, trend: 'stable', change: 0.2 }
  });

  const [auctions, setAuctions] = useState([
    {
      id: 1,
      type: 'plastic',
      quantity: '50 kg',
      currentBid: 275000,
      endTime: '2024-01-20T15:00:00',
      bidders: 8,
      quality: 'premium'
    },
    {
      id: 2,
      type: 'electronic',
      quantity: '15 kg',
      currentBid: 225000,
      endTime: '2024-01-20T18:30:00',
      bidders: 12,
      quality: 'high'
    }
  ]);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        plastic: {
          ...prev.plastic,
          price: prev.plastic.price + (Math.random() - 0.5) * 100
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const placeBid = (auctionId, bidAmount) => {
    setAuctions(prev => 
      prev.map(auction => 
        auction.id === auctionId 
          ? { ...auction, currentBid: bidAmount, bidders: auction.bidders + 1 }
          : auction
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Market Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Smart Pricing Market</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Object.entries(marketData).map(([type, data]) => (
              <div key={type} className="bg-gray-50 p-4 rounded-xl border">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium capitalize">{type}</span>
                  <span className={`text-sm ${
                    data.trend === 'up' ? 'text-green-600' : 
                    data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {data.trend === 'up' ? '↗' : data.trend === 'down' ? '↘' : '→'} {Math.abs(data.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  Rp {data.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">per kg</p>
              </div>
            ))}
          </div>

          {/* Price Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center">
              <span className="text-yellow-600 text-lg mr-3">🔔</span>
              <div>
                <p className="font-medium text-yellow-800">Price Alert: Plastik PET</p>
                <p className="text-yellow-700 text-sm">Harga naik 5.7% dalam 24 jam terakhir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Auctions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Auctions</h2>
          
          <div className="space-y-4">
            {auctions.map((auction) => (
              <div key={auction.id} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      auction.quality === 'premium' ? 'bg-purple-100 text-purple-800' :
                      auction.quality === 'high' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {auction.type.toUpperCase()} - {auction.quality}
                    </span>
                    <p className="text-lg font-semibold mt-2">{auction.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      Rp {auction.currentBid.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{auction.bidders} penawar</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Berakhir: {new Date(auction.endTime).toLocaleTimeString()}
                  </div>
                  
                  <button
                    onClick={() => placeBid(auction.id, auction.currentBid + 5000)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600"
                  >
                    Tambah Penawaran
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPricing;
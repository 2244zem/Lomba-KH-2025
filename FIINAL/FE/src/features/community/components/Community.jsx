import React, { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Sarah Eco', avatar: '👩', role: 'Eco Warrior' },
      content: 'Berhasil mengurangi 5kg sampah plastik minggu ini! Tips: bawa tas belanja sendiri dan hindari kemasan sekali pakai.',
      likes: 24,
      comments: 8,
      timestamp: '2 jam yang lalu',
      type: 'achievement'
    },
    {
      id: 2,
      user: { name: 'Green Team Jakarta', avatar: '🏢', role: 'Community Leader' },
      content: 'Event cleanup weekend di Taman Suropati! Ayo bergabung Sabtu jam 7 pagi. Siapkan sarung tangan dan semangat! 🌿',
      likes: 45,
      comments: 12,
      timestamp: '5 jam yang lalu',
      type: 'event'
    }
  ]);

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Eco Warriors Jakarta',
      members: 1247,
      activity: 'high',
      description: 'Komunitas peduli lingkungan DKI Jakarta'
    },
    {
      id: 2,
      name: 'Plastic Free Indonesia',
      members: 892,
      activity: 'medium',
      description: 'Perangi sampah plastik sekali pakai'
    }
  ]);

  const addPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: { name: 'Anda', avatar: '👤', role: 'Member' },
      content,
      likes: 0,
      comments: 0,
      timestamp: 'Baru saja',
      type: 'post'
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  👤
                </div>
                <h3 className="font-semibold text-gray-900">Eco Member</h3>
                <p className="text-sm text-gray-600">Level 5 Warrior</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                <div>
                  <div className="font-bold text-gray-900">47</div>
                  <div className="text-xs text-gray-600">Posting</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">128</div>
                  <div className="text-xs text-gray-600">Likes</div>
                </div>
              </div>
            </div>

            {/* Groups */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Komunitas Anda</h3>
              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">👥</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{group.name}</p>
                      <p className="text-xs text-gray-600">{group.members} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  👤
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Bagikan pencapaian daur ulang Anda..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                    rows="3"
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-green-600">📷</button>
                      <button className="p-2 text-gray-500 hover:text-green-600">🎉</button>
                      <button className="p-2 text-gray-500 hover:text-green-600">♻️</button>
                    </div>
                    <button 
                      onClick={() => addPost("Postingan baru tentang daur ulang!")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600"
                    >
                      Posting
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-lg">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {post.user.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{post.timestamp}</p>
                    </div>
                  </div>

                  <p className="text-gray-800 mb-4">{post.content}</p>

                  {post.type === 'achievement' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <span className="text-green-600 mr-2">🏆</span>
                        <span className="text-green-800 font-medium">Pencapaian Lingkungan</span>
                      </div>
                    </div>
                  )}

                  {post.type === 'event' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">📅</span>
                        <span className="text-blue-800 font-medium">Event Komunitas</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                        <span>👍</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-green-600">
                      🔄 Bagikan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const Gamification = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    level: 5,
    points: 1250,
    nextLevel: 2000,
    streak: 7,
    rank: 'Eco Warrior'
  });

  const [dailyChallenges, setDailyChallenges] = useState([
    { id: 1, title: 'Pilah 3 jenis sampah', reward: 50, completed: true },
    { id: 2, title: 'Kumpulkan 2kg plastik', reward: 100, completed: false },
    { id: 3, title: 'Ajak 1 teman bergabung', reward: 150, completed: false }
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, name: 'Recycle Beginner', icon: '🌱', unlocked: true },
    { id: 2, name: 'Plastic Crusher', icon: '♻️', unlocked: true },
    { id: 3, name: 'Eco Warrior', icon: '🛡️', unlocked: true },
    { id: 4, name: 'Green Legend', icon: '🏆', unlocked: false }
  ]);

  const completeChallenge = (challengeId) => {
    setDailyChallenges(prev =>
      prev.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      )
    );
    
    setUserStats(prev => ({
      ...prev,
      points: prev.points + dailyChallenges.find(c => c.id === challengeId).reward
    }));
  };

  const progress = (userStats.points / userStats.nextLevel) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-gray-600">Level {userStats.level} • {userStats.rank}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{userStats.points}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Level {userStats.level}</span>
              <span>{userStats.points} / {userStats.nextLevel} points</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <span className="text-yellow-600 text-lg mr-2">🔥</span>
            <span className="font-medium text-yellow-800">{userStats.streak} hari beruntun!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Challenges */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Challenges</h2>
            <div className="space-y-3">
              {dailyChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all ${
                    challenge.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div>
                    <p className="font-medium">{challenge.title}</p>
                    <p className="text-sm text-gray-600">+{challenge.reward} points</p>
                  </div>
                  
                  {challenge.completed ? (
                    <span className="text-green-600 font-medium">✅ Selesai</span>
                  ) : (
                    <button
                      onClick={() => completeChallenge(challenge.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600"
                    >
                      Klaim
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`text-center p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <p className="font-medium text-sm">{achievement.name}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {achievement.unlocked ? 'Unlocked' : 'Locked'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Events */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 mt-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Green Weekend Event</h2>
              <p className="opacity-90">2x points untuk semua transaksi plastik</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">48:15:32</div>
              <div className="opacity-90">Berakhir dalam</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
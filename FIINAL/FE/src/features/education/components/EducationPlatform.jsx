import React, { useState } from 'react';

const EducationPlatform = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState([1, 2]);

  const courses = [
    {
      id: 1,
      title: 'Dasar-dasar Pemilahan Sampah',
      instructor: 'Dr. Green Eco',
      duration: '2 jam',
      level: 'Pemula',
      students: 1247,
      progress: 75,
      image: '🌱',
      category: 'basic'
    },
    {
      id: 2,
      title: 'Teknik Daur Ulang Kreatif',
      instructor: 'Creative Recycle Team',
      duration: '3 jam',
      level: 'Menengah',
      students: 892,
      progress: 30,
      image: '🎨',
      category: 'creative'
    },
    {
      id: 3,
      title: 'Manajemen Sampah Perkantoran',
      instructor: 'Corporate Green Expert',
      duration: '1.5 jam',
      level: 'Professional',
      students: 456,
      progress: 0,
      image: '🏢',
      category: 'corporate'
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Cara Memilah Plastik dengan Benar',
      duration: '8 menit',
      views: '12K',
      thumbnail: '📹'
    },
    {
      id: 2,
      title: 'DIY Pot dari Botol Plastik',
      duration: '15 menit',
      views: '8K',
      thumbnail: '📹'
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Kategori' },
    { id: 'basic', name: 'Dasar' },
    { id: 'creative', name: 'Kreatif' },
    { id: 'corporate', name: 'Perusahaan' },
    { id: 'advanced', name: 'Lanjutan' }
  ];

  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
  };

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eco Education Platform</h1>
          <p className="text-gray-600">Tingkatkan pengetahuan daur ulang Anda dengan kursus dan tutorial</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeCategory === category.id
                        ? 'bg-green-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Progress Belajar</h3>
              <div className="space-y-4">
                {courses.filter(c => enrolledCourses.includes(c.id)).map((course) => (
                  <div key={course.id}>
                    <p className="text-sm font-medium text-gray-900 mb-1">{course.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{course.progress}% selesai</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Courses Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kursus Terpopuler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{course.image}</div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {course.level}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">Oleh {course.instructor}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>⏱️ {course.duration}</span>
                        <span>👥 {course.students} siswa</span>
                      </div>

                      {enrolledCourses.includes(course.id) ? (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <button className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                            Lanjutkan Belajar
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => enrollCourse(course.id)}
                          className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600"
                        >
                          Daftar Kursus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Tutorial Cepat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:border-green-300 transition-colors cursor-pointer">
                    <div className="text-3xl">{tutorial.thumbnail}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>⏱️ {tutorial.duration}</span>
                        <span>👁️ {tutorial.views} views</span>
                      </div>
                    </div>
                    <button className="text-green-600 hover:text-green-700">▶️</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Dapatkan Sertifikasi Eco Expert</h2>
              <p className="opacity-90 mb-6">Selesaikan kursus dan dapatkan sertifikat resmi</p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Lihat Persyaratan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPlatform;
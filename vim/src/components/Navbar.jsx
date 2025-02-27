import { Link, useLocation } from 'react-router-dom'
import React, { useState } from 'react';

const Profile = () => {
  // Sample user data (in a real app, this would come from an API or context)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: '/api/placeholder/150/150',
    stats: {
      workoutsCompleted: 87,
      streakDays: 14,
      caloriesBurned: 12540,
      hoursActive: 45
    },
    goals: [
      { id: 1, title: 'Lose 5kg', progress: 60, target: '5kg', current: '3kg' },
      { id: 2, title: 'Run 100km', progress: 75, target: '100km', current: '75km' },
      { id: 3, title: 'Drink 2L water daily', progress: 90, target: '60L', current: '54L' }
    ],
    preferences: {
      notifications: true,
      darkMode: false,
      metricSystem: 'metric'
    }
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({...userData});

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setEditedUserData({
        ...editedUserData,
        [section]: {
          ...editedUserData[section],
          [field]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Save profile changes
  const handleSave = () => {
    setUserData(editedUserData);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUserData({...userData});
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 px-6 py-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
              <p className="text-blue-100">{userData.email}</p>
              <div className="mt-2">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSave}
                      className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Stats Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-blue-600 text-2xl font-bold">{userData.stats.workoutsCompleted}</p>
              <p className="text-gray-600">Workouts</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-green-600 text-2xl font-bold">{userData.stats.streakDays}</p>
              <p className="text-gray-600">Day Streak</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-orange-600 text-2xl font-bold">{userData.stats.caloriesBurned}</p>
              <p className="text-gray-600">Calories Burned</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-purple-600 text-2xl font-bold">{userData.stats.hoursActive}</p>
              <p className="text-gray-600">Hours Active</p>
            </div>
          </div>
        </div>
        
        {/* Fitness Goals */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Fitness Goals</h2>
          {userData.goals.map(goal => (
            <div key={goal.id} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{goal.title}</span>
                <span className="text-gray-500">{goal.current} / {goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-teal-400 h-2.5 rounded-full" 
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Account Settings */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
          
          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Notifications</span>
                <span className="text-gray-500">{userData.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Dark Mode</span>
                <span className="text-gray-500">{userData.preferences.darkMode ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-700">Measurement System</span>
                <span className="text-gray-500">{userData.preferences.metricSystem === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lb, in)'}</span>
              </div>
            </div>
          ) : (
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center pb-2 border-b">
                <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleChange}
                  className="w-full md:w-2/3 p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center pb-2 border-b">
                <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleChange}
                  className="w-full md:w-2/3 p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center pb-2 border-b">
                <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0">Notifications:</label>
                <div className="w-full md:w-2/3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      checked={editedUserData.preferences.notifications}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="ml-2">Enable notifications</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center pb-2 border-b">
                <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0">Dark Mode:</label>
                <div className="w-full md:w-2/3">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.darkMode"
                      checked={editedUserData.preferences.darkMode}
                      onChange={handleChange}
                      className="rounded text-blue-600"
                    />
                    <span className="ml-2">Enable dark mode</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center pb-2 border-b">
                <label className="w-full md:w-1/3 text-gray-700 mb-2 md:mb-0">Measurement System:</label>
                <div className="w-full md:w-2/3">
                  <select
                    name="preferences.metricSystem"
                    value={editedUserData.preferences.metricSystem}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lb, in)</option>
                  </select>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  const stats = [
    { name: 'Workouts Completed', value: '24', change: '+3 this week' },
    { name: 'Calories Burned', value: '9,280', change: '+520 this week' },
    { name: 'Workout Minutes', value: '386', change: '+42 this week' },
    { name: 'Achievements', value: '12', change: '+2 this week' },
  ]
  
  const activities = [
    { id: 1, name: 'Full Body Workout', type: 'Strength', duration: '45 min', completed: '2 days ago' },
    { id: 2, name: 'Morning Cardio', type: 'Cardio', duration: '30 min', completed: '3 days ago' },
    { id: 3, name: 'Core & Abs', type: 'Strength', duration: '25 min', completed: '4 days ago' },
    { id: 4, name: 'Upper Body Focus', type: 'Strength', duration: '40 min', completed: '1 week ago' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Fitness Enthusiast!</h1>
        <p className="mt-2 text-lg text-gray-600">Track your progress and stay motivated</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              <dd className="mt-2 text-sm text-green-600">{stat.change}</dd>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`${
              activeTab === 'activities'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Recent Activities
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`${
              activeTab === 'goals'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Goals
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Progress chart will appear here</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Workouts</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-base font-medium text-gray-900">HIIT Session</h4>
                    <p className="text-sm text-gray-500">Tomorrow, 7:00 AM</p>
                    <div className="mt-3 flex">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        30 min
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Cardio
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-base font-medium text-gray-900">Yoga Flow</h4>
                    <p className="text-sm text-gray-500">Friday, 6:30 PM</p>
                    <div className="mt-3 flex">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        45 min
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Flexibility
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to="/workout"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 focus:outline-none"
              >
                Start New Workout
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'activities' && (
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {activities.map((activity) => (
                <li key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-300 flex items-center justify-center text-white">
                      {activity.type.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.type} • {activity.duration}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.completed}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-gray-50 px-6 py-3 flex justify-center">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all activities
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'goals' && (
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Weekly Goal</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress: 3/4 workouts</span>
                  <span>75%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Monthly Goal</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-teal-500 h-2.5 rounded-full w-2/3"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress: 10/15 workouts</span>
                  <span>67%</span>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 focus:outline-none"
                >
                  Set New Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
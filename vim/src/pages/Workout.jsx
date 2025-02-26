import { useState } from 'react'

const Workout = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Workouts' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' }
  ]
  
  const workouts = [
    {
      id: 1,
      title: 'Full Body Burn',
      category: 'strength',
      duration: '45 min',
      level: 'Intermediate',
      image: '/api/placeholder/400/240',
      description: 'Complete full body workout targeting all major muscle groups.'
    },
    {
      id: 2,
      title: 'HIIT Cardio Challenge',
      category: 'hiit',
      duration: '30 min',
      level: 'Advanced',
      image: '/api/placeholder/400/240',
      description: 'High intensity interval training to maximize calorie burn.'
    },
    {
      id: 3,
      title: 'Morning Yoga Flow',
      category: 'yoga',
      duration: '35 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      description: 'Gentle yoga flow to start your day with energy and focus.'
    },
    {
      id: 4,
      title: 'Tabata Burn',
      category: 'hiit',
      duration: '25 min',
      level: 'Intermediate',
      image: '/api/placeholder/400/240',
      description: '20 seconds on, 10 seconds off. The ultimate HIIT workout.'
    },
    {
      id: 5,
      title: 'Core Crusher',
      category: 'strength',
      duration: '20 min',
      level: 'Intermediate',
      image: '/api/placeholder/400/240',
      description: 'Focused core workout to build a strong, stable midsection.'
    },
    {
      id: 6,
      title: 'Steady State Cardio',
      category: 'cardio',
      duration: '40 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      description: 'Consistent pace cardio session to build endurance.'
    }
  ]
  
  const filteredWorkouts = selectedCategory === 'all' 
    ? workouts 
    : workouts.filter(workout => workout.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
        <p className="mt-2 text-lg text-gray-600">Choose your workout and start your fitness journey</p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search workouts"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workout Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="relative">
              <img
                src={workout.image}
                alt={workout.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {workout.duration}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">{workout.title}</h3>
              <div className="mt-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  workout.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  workout.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {workout.level}
                </span>
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {categories.find(c => c.id === workout.category)?.name}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-500">{workout.description}</p>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 focus:outline-none">
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No workouts found for the selected category.</p>
        </div>
      )}
    </div>
  )
}

export default Workout
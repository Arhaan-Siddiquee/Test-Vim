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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Find Your <span className="text-[#48c4a4]">Perfect Workout</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">Choose your workout and start your fitness journey</p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-10">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#48c4a4] text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-[#48c4a4]/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search workouts"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#48c4a4] focus:border-transparent transition-all duration-300"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Workout Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <div key={workout.id} className="bg-white overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img
                src={workout.image}
                alt={workout.title}
                className="h-52 w-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#48c4a4]/90 text-white shadow-md">
                  {workout.duration}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{workout.title}</h3>
              <div className="mt-3 flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  workout.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  workout.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {workout.level}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#48c4a4]/10 text-[#48c4a4]">
                  {categories.find(c => c.id === workout.category)?.name}
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{workout.description}</p>
              <div className="mt-6">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-[#48c4a4] hover:bg-[#3aaa8d] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#48c4a4] transform hover:scale-[1.02]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredWorkouts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-[#48c4a4]/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#48c4a4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg font-medium">No workouts found</p>
          <p className="text-gray-500 mt-2 text-center">Try selecting a different category or modifying your search.</p>
        </div>
      )}
    </div>
  )
}

export default Workout
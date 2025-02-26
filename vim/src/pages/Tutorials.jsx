import { useState } from 'react'

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Tutorials' },
    { id: 'technique', name: 'Technique' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'recovery', name: 'Recovery' }
  ]
  
  const tutorials = [
    {
      id: 1,
      title: 'Proper Squat Form',
      category: 'technique',
      duration: '8 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      views: '12.5K',
      description: 'Master the perfect squat form to prevent injuries and maximize gains.'
    },
    {
      id: 2,
      title: 'Pre-Workout Nutrition',
      category: 'nutrition',
      duration: '12 min',
      level: 'Intermediate',
      image: '/api/placeholder/400/240',
      views: '8.3K',
      description: 'Learn what to eat before workouts for optimal performance and energy.'
    },
    {
      id: 3,
      title: '5-Minute Meditation',
      category: 'mindfulness',
      duration: '5 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      views: '15.1K',
      description: 'Quick meditation practice to center yourself before or after workouts.'
    },
    {
      id: 4,
      title: 'Foam Rolling Techniques',
      category: 'recovery',
      duration: '10 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      views: '7.8K',
      description: 'Effective foam rolling methods to release muscle tension and improve recovery.'
    },
    {
      id: 5,
      title: 'Perfect Push-Up Guide',
      category: 'technique',
      duration: '7 min',
      level: 'Beginner',
      image: '/api/placeholder/400/240',
      views: '20.3K',
      description: 'Step-by-step guide to mastering push-ups for all fitness levels.'
    },
    {
      id: 6,
      title: 'Protein Timing Strategy',
      category: 'nutrition',
      duration: '15 min',
      level: 'Advanced',
      image: '/api/placeholder/400/240',
      views: '6.2K',
      description: 'Advanced strategies for timing protein intake to maximize muscle growth.'
    }
  ]
  
  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory)
    
  const featuredTutorial = tutorials[0]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tutorials</h1>
        <p className="mt-2 text-lg text-gray-600">Learn proper techniques and fitness knowledge</p>
      </div>
      
      {/* Featured Tutorial */}
      <div className="mb-12 bg-white shadow rounded-lg overflow-hidden">
        <div className="sm:flex">
          <div className="sm:w-1/2">
            <img
              src="/api/placeholder/600/400"
              alt="Featured Tutorial"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:w-1/2 flex flex-col justify-center">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
              Featured
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Master the Perfect Deadlift</h2>
            <p className="text-gray-600 mb-6">
              Learn the essential deadlift technique from our expert trainers. This comprehensive tutorial covers 
              setup, execution, common mistakes, and variations for all fitness levels.
            </p>
            <div className="flex items-center mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                Technique
              </span>
              <span className="text-sm text-gray-500">18 min • 35.7K views</span>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 focus:outline-none">
              Watch Tutorial
            </button>
          </div>
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4">
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
      </div>
      
      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="relative">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {tutorial.duration}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">{tutorial.title}</h3>
              <div className="mt-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  tutorial.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  tutorial.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tutorial.level}
                </span>
                <span className="ml-auto text-sm text-gray-500">{tutorial.views} views</span>
              </div>
              <p className="mt-3 text-sm text-gray-500">{tutorial.description}</p>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90 focus:outline-none">
                  Watch Tutorial
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredTutorials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tutorials found for the selected category.</p>
        </div>
      )}
    </div>
  )
}

export default Tutorials
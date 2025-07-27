import React from 'react'

const Celebration = () => {
 <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-8xl mb-4 animate-bounce">🎉</div>
      <h2 className="text-4xl font-bold text-yellow-400 mb-2 animate-pulse">
        Congratulations!
      </h2>
      <p className="text-xl text-white">All tasks completed! 🎊</p>
    </div>
    
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][
              Math.floor(Math.random() * 5)
            ]
          }`} />
        </div>
      ))}
    </div>
  </div>

}

export default Celebration
import React from 'react';
import home from "../assets/Home.webp";

function DashboardPage() {
  return (
    <div
            className="relative flex items-center justify-center h-[50vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${home})`,
            }}
          >
            {/* Overlay for blur */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
    
            {/* Text Content */}
    
            <div className="relative text-center">
              <p className="text-xl font-bold text-gray-200 mb-2">Welcome to</p>
              <p className="text-5xl font-extrabold text-white">CodeZilla</p>
            </div>
          </div>
  )
}

export default DashboardPage;
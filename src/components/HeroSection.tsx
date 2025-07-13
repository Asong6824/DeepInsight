
import React from 'react';
import BookCanvas from './ui/BookCanvas';

const HeroSection = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      

      {/* Main Content */}
      <main className="flex-grow flex items-center">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="text-left md:pl-20">
            <h1 className="text-6xl font-bold leading-tight">
              DEEPER
              <br/>
              READING
              <br/>
              DEEPER
              <br/>
              KNOWLEDGE
            </h1>
            <button className="mt-8 bg-[#f4a443] text-black px-8 py-4 rounded-md font-bold hover:bg-[#f4a443]">
              Learn More
            </button>
          </div>

          {/* Right Side - Canvas Illustration */}
          <div className="flex justify-center items-center">
            <BookCanvas />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;

import React, { useEffect, useRef, useState } from 'react';
import Counter from "./Counter"
import NgoIcon from "../assets/NgoIcon"
import CommunityIcon from "../assets/CommunityIcon"
import book from "../assets/book.jpg"
import people from "../assets/people.jpg"
import sunflower from "../assets/sunflower.jpg"


const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef();
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) observer.unobserve(sectionRef.current);
      };
    }, []);

  return (
    <div 
    ref={sectionRef} className={`flex flex-col items-center p-16 transition-opacity duration-1000 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-5'}`}>
      <h1 className="text-center text-2xl font-bold mb-4 text-[#612D2D] md:text-3xl">
        Gateway to improving lives
      </h1>
      <div className='flex flex-col space-y-10 md:flex-row justify-center md:space-y-0 md:space-x-20 p-8'>
          <div className="relative flex flex-col items-center justify-center max-w-sm px-16 py-12 bg-[#2E7D32] bg-cover 
          bg-center border border-gray-200 rounded-lg shadow-sm hover:bg-[#9CAF88] dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
          style={{ backgroundImage: `url(${book})` }}>
            <div className="absolute inset-0 bg-white/25 backdrop-blur-sm z-0 rounded-lg" />
            <div className="relative z-10 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" width="48">
                <g data-name="hand recieve cloathes">
                  <path fill="#6fabe6" d="M1 23h6v17H1z" />
                  <path fill="#82bcf4" d="M7 23c0 15.75-.1 15 0 15a4 4 0 0 1-4-4V23z" />
                  <path fill="#f6ccaf" d="M47 31a3 3 0 0 1-1.63 2.67C27.74 42.68 28.11 43 24.17 43c-2.86 0-4-.83-12-4.46C10.7 37.86 9.68 38 7 38V25c9.53-1.19 6.49-1.67 21.28 5.28a3 3 0 0 1 .48 5.14l13.87-7.09A3 3 0 0 1 47 31z" />
                  <path fill="#ffdec7" d="M46.82 30c-.53 1.55-.32 1.09-17.55 9.9a10.21 10.21 0 0 1-5.1 1.1c-2.86 0-4-.83-12-4.46A5.82 5.82 0 0 0 10 36a1 1 0 0 1-1-1V24.75c7.17-.89 5.14-1.11 19.28 5.53a3 3 0 0 1 1.17 4.43c-.45.71-1.38 1.07.2.25 13.89-7.09 13-6.67 13.35-6.78A3 3 0 0 1 46.82 30z" />
                  <path fill="#edb996" d="M25.29 36.61 17.4 32.9a1 1 0 0 1 .86-1.8l7.89 3.71c1.69.79 2.29-1.11 3.3-.1-.45.71-1.38 1.07.2.25.78 1.52-2.39 2.6-4.36 1.65z" />
                  <path fill="#db5669" d="m46 12-4 7-4-2.67V30.7l-9.24 4.72a3 3 0 0 0-.48-5.14L18 25.45v-9.12L14 19l-4-7 8-7h20z" />
                  <path fill="#f26674" d="M46 12c-3.87 6.76-3.25 5.67-4 7l-4-2.67v12.12l-6.19 3.17a5 5 0 0 0-2.68-3.15L20 24.18v-7.85l-2 1.34v-1.34L15.45 18 12 12l8-7h18z" />
                  <path fill="#c4455e" d="M32 5c0 1.32.11 2.65-1.28 3.93A4 4 0 0 1 24 6V5z" />
                  <path fill="#db5669" d="M32 5c0 1.32.11 2.65-1.28 3.93A4 4 0 0 1 26 5z" />
                </g>
              </svg>
          <Counter targetNumber={265} duration={2000} label="Items Donated"/>
          </div> 
          </div>


          <div className="relative flex flex-col items-center justify-center max-w-sm px-16 py-12 bg-[#81D4FA] bg-cover 
          bg-center border border-gray-200 rounded-lg shadow-sm hover:bg-[#9CAF88] dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style={{ backgroundImage: `url(${sunflower})` }}>
            <div className="absolute inset-0 bg-white/25 backdrop-blur-sm z-0 rounded-lg" />
            <div className="relative z-10 flex flex-col items-center">
              <NgoIcon className="w-4 h-4"/>
          <Counter targetNumber={15} duration={2000} label="NGOs Onboard"/>
          </div>
          </div>
          

          <div className="relative flex flex-col items-center justify-center max-w-sm px-16 py-12 bg-[#FDF6EC] bg-cover 
          bg-center border border-gray-200 rounded-lg shadow-sm hover:bg-[#9CAF88] dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style={{ backgroundImage: `url(${people})` }}>
            <div className="absolute inset-0 bg-white/25 backdrop-blur-sm z-0 rounded-lg" />
            <div className="relative z-10 flex flex-col items-center">
              <CommunityIcon className="w-8 h-8"/>
          <Counter targetNumber={250} duration={2000} label="People helped"/>
          </div>
          </div> 
          
      </div>
    </div>
  );
};

export default Impact;
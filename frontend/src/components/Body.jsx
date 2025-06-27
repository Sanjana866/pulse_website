import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

const Body = () => {
  const [isVisible, setIsVisible]=useState(false);
  const sectionRef=useRef();

  useEffect(()=>{
    const observer=new IntersectionObserver(
      ([entry])=>{
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {threshold: 0.5}
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return ()=>{
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  },[]);

  return (
    <div
      ref={sectionRef}
      className={`text-center px-8 p-24 bg-[#F4FAF3] transition-opacity duration-1000 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-5'
      }`}
    >
      <h1 className="text-3xl font-bold mb-4 text-[#612D2D] md:text-4xl">
        Give new life to books and clothes. Join the <br />
        <span className="text-3xl font-bold mb-4 text-[#82B171] md:text-4xl">
          Circular
        </span>{' '}
        Revolution.
      </h1>
      <p className="text-sm md:text-lg mb-8 text-gray-700 max-w-xl mx-auto">
        Donate unused items to verified NGOs, easily.
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/register"
          className="btn w-48 mx-auto bg-[#A5D395] text-black px-4 py-2 rounded-full hover:bg-gray-300 hover:text-white transition"
        >
          JOIN US NOW
        </Link>
        <Link to="/method" className="w-48 mx-auto border-4 border-[#A5D395] px-4 py-2 rounded-full hover:bg-gray-400 transition">
          SEE HOW IT WORKS
        </Link>
      </div>
    </div>
  );
};

export default Body;

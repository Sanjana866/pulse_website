import React, { useState, useRef, useEffect } from 'react';
import ListIcon from '../components/icons/ListIcon';
import NgoIcon from '../components/icons/NgoIcon';
import LocationIcon from '../components/icons/LocationIcon';
import ImpactbadgeIcon from '../components/icons/ImpactbadgeIcon';

const Method = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'auto' });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.2 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => {
    if (sectionRef.current) observer.unobserve(sectionRef.current);
  };
}, []);


  return (
    <div>
      <div 
      ref={sectionRef}
      className={`h-[50vh] flex items-center justify-center bg-gradient-to-t from-[#82B171]/65 to-[#82B171]/35 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#612D2D]/45 to-[#612D2D]">
        HOW IT WORKS</h1>
      </div>        

      
      <div className="flex flex-wrap justify-center gap-8 px-4 py-20 md:px-16">
        {[
          {
            step: '1',
            Icon: ListIcon,
            text: 'Users can log in with their credentials and list items they wish to donate. Include an image with each listing.'
          },
          {
            step: '2',
            Icon: NgoIcon,
            text: 'Donors are matched with verified NGOs based on the items listed and the NGOs available.'
          },
          {
            step: '3',
            Icon: LocationIcon,
            text: 'After confirmation, pickup can be scheduled by the user. Details are shared with both parties.'
          },
          {
            step: '4',
            Icon: ImpactbadgeIcon,
            text: 'The donation status can be tracked and information is updated on the user dashboard when it reaches the NGO.'
          }
        ].map(({ step, Icon, text }, index) => (
          <div
            key={index}
            className="w-full sm:w-72 flex flex-col items-center text-center bg-white rounded-xl shadow-xl px-6 py-10 hover:bg-[#9CAF88]/90 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <div className="text-3xl font-bold text-[#4B3F3F] mb-4">{step}</div>
            <Icon />
            <p className="mt-6 text-gray-700 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Method;

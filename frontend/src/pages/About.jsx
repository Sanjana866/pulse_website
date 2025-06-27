import React,{useState,useRef,useEffect} from 'react';
import Footer from '../components/Footer'
import background from '../assets/background.avif'
import DetailsAbout from '../components/DetailsAbout';
import DetailsMethod from '../components/DetailsMethod';
import DetailsOurStory from '../components/DetailsOurStory';

const About = () => {
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
    <>
      <div 
      className={`min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-cover 
      bg-center text-center px-4 }`}
      style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-white/15 backdrop-blur-sm z-0 rounded-lg" />
                      <div 
                      ref={sectionRef}
                      className={`relative z-10 flex flex-col items-center bg-cover 
                      bg-center text-center px-4 transition-opacity duration-2000 ${
                       isVisible ? 'animate-fade-in-up' : 'opacity-5'}`}>
        <h1 className="text-4xl text-[#612D2D] font-extrabold md:text-6xl mb-4">OUR WHY</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          Connecting generous hearts with real impact.
        </p>
        </div>
      </div>
        
      <DetailsAbout/>
      <DetailsMethod/>
      <DetailsOurStory/>
      <Footer/>
    </>
  );
};

export default About;

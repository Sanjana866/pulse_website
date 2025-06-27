import react, {useState,useRef,useEffect} from 'react';
import ListIcon from '../components/icons/ListIcon';
import NgoIcon from '../components/icons/NgoIcon';
import LocationIcon from '../components/icons/LocationIcon';
import ImpactbadgeIcon from '../components/icons/ImpactbadgeIcon';

const DetailsMethod=()=>{
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

    return(
        <div 
        ref={sectionRef}
        className={`py-16 px-6 md:px-24 bg-[#A5D395]/15 text-center transition-opacity duration-1000 
            ${isVisible?'animate-fade-in-up':'opacity-0'}`}>
        <h2 className="text-2xl font-bold md:text-4xl mb-12 text-[#612D2D]">OUR METHOD</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <ListIcon />
          <NgoIcon />
          <LocationIcon />
          <ImpactbadgeIcon />
        </div>
      </div>

    );
};

export default DetailsMethod;
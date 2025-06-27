import react, {useState,useRef,useEffect} from 'react';

const DetailsOurStory=()=>{
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
        ref={sectionRef} className={`py-8 px-6 md:px-24 md:py-16 text-center transition-opacity duration-1000
            ${isVisible?'animate-fade-in-up':'opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-4 text-[#612D2D] md:text-4xl">OUR STORY</h2>
        <p className="text-gray-700 max-w-3xl mx-auto ">
          Born from a desire to simplify charitable giving, our platform bridges the gap between those who want to give and those who need support the most.
          With this initiative, we hope to build a sustainable future by reducing carbon emissions. Ours is a team of four, willing to 
          expand into a larger community where everyone can contribute bit by bit making a greater environmental impact.
        </p>
      </div>
    );
};

export default DetailsOurStory;
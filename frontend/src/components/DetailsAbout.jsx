import react, {useState,useEffect,useRef} from 'react'

const DetailsAbout=()=>{
    const [isVisible, setIsVisible]=useState(false);
        const sectionRef=useRef();
      
        useEffect(()=>{
          const observer=new IntersectionObserver(
            ([entry])=>{
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            {threshold: 0.6}
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
        className={`py-16 px-6 md:px-24 text-center transition-opacity duration-2000
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto">
          We help people donate books and clothes by matching them with verified NGOs in need — making giving easy, meaningful, and impactful.
          With fashion responsible for 92 million tons of waste and 10% of global carbon emissions, and over 32 million trees cut annually 
          for books, we’re committed to reducing this impact.
          <span className='font-bold'> Reusing and recycling clothes can reduce up to 80% of carbon emissions compared to making new garments while recycling paper reduces energy use by 30–70%. </span>
           Our mission is to make unused items accessible to those in need while also making a global impact through sustainable choices.
        </p>
      </div>
    );
};

export default DetailsAbout;
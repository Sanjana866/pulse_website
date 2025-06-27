import React, { useState, useEffect } from "react";
import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.jpg";

const images = [photo, photo2];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="relative flex justify-center items-center bg-cover 
      bg-center h-[30rem] md:h-[40rem] bg-[#F4FAF3] transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border border-white transition 
              ${index === currentImageIndex ? "bg-white" : "bg-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ targetNumber, duration, label, description }) => {
  const [count, setCount] = useState(0);
  const [startCounting, setStartCounting] = useState(false);
  const counterRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    const currentRef = counterRef.current;

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
        } else {
          setStartCounting(false);
        }
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (observer.current && currentRef) {
        observer.current.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    if (startCounting) {
      let start = 0;
      const end = targetNumber;
      const increment = end / (duration / 50);

      timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setCount(Math.floor(start));
      }, 50);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [startCounting, targetNumber, duration]);

  return (
    <div ref={counterRef} className="flex flex-col items-center text-center mb-2 text-2xl font-bold tracking-tight text-white dark:text-white"> 
      <h2 className="counter-number">{count.toLocaleString()}+</h2> 
      <p className="text-white">{label}</p>
    </div>
  );
};

export default Counter;
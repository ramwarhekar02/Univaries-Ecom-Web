import React, { useState, useEffect } from 'react';
import deals from "../../assets/images/deals.png";

const DealsSection = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      if (remaining.total <= 0) {
        setTimeRemaining(calculateTimeRemaining());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const difference = nextMonth - now;

    const calculateParts = (diff) => ({
      total: diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    });

    return difference <= 0
      ? calculateParts(new Date(now.getFullYear(), now.getMonth() + 2, 1) - now)
      : calculateParts(difference);
  }

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className='w-full rounded-lg shadow-lg bg-zinc-100 pt-2 my-20 max-w-[1260px] mx-auto flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 h-64 md:h-auto px-4 md:px-10 mb-5 md:mb-0'>
        <img className='w-full h-full object-cover rounded-md' src={deals} alt="Deals" />
      </div>
      <div className='w-full md:w-1/2 h-full flex items-center px-4 md:px-0'>
        <div>
          <h3 className='text-lg pb-3 text-red-800 font-semibold text-center md:text-left'>
            Get upto @20% Discount
          </h3>
          <h1 className='text-3xl md:text-4xl font-bold text-center md:text-left'>
            Deal of this Month
          </h1>
          <p className='leading-6 text-justify py-4 text-base text-zinc-500 font-semibold'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, sed expedita est ducimus esse, temporibus sapiente explicabo necessitatibus quae saepe sunt eligendi iusto suscipit distinctio voluptates ipsum odio, maxime vel!
          </p>
          <div className='flex flex-wrap gap-4 justify-center md:justify-start'>
            {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
              <div
                key={i}
                className='w-20 h-20 rounded-full flex flex-col shadow-xl items-center justify-center text-base'
              >
                {addLeadingZero(timeRemaining[unit])}
                <span className='text-sm'>{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsSection;

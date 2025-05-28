import { useState, useEffect } from 'react';

function CountUp({ start = 0, end, duration = 2000, formatter = false }) {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
    
    return () => {
      startTimestamp = null;
    };
  }, [start, end, duration]);
  
  const formatNumber = (num) => {
    if (!formatter) return num;
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  return formatNumber(count);
}

export default CountUp;
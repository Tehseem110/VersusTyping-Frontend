import React, { useState, useEffect } from 'react';
const SuccessCard = ({ wpm, lps, tt }) => {
  const [incrementwpm, setIncrementwpm] = useState(0);
  const [incrementlps, setIncrementlps] = useState(0);
  const [incrementtt, setIncrementtt] = useState(0);
  useEffect(() => {
    console.log('trigger');
  }, []);

  useEffect(() => {
    if (incrementwpm === wpm) {
      return;
    }
    const intervalId = setInterval(() => {
      const newIncrement = incrementwpm + 1;
      console.log(newIncrement);
      setIncrementwpm(newIncrement);
    }, 20);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [incrementwpm]);

  useEffect(() => {
    if (incrementlps === lps) {
      return;
    }
    const intervalId = setInterval(() => {
      const newIncrement = incrementlps + 1;
      console.log(newIncrement);
      setIncrementlps(newIncrement);
    }, 20);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [incrementlps]);
  useEffect(() => {
    if (incrementtt === tt) {
      return;
    }
    const intervalId = setInterval(() => {
      const newIncrement = incrementtt + 1;
      console.log(newIncrement);
      setIncrementtt(newIncrement);
    }, 20);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [incrementtt]);
  return (
    <div
      className="text-white p-5 rounded-xl flex gap-2 w-[550px] justify-around

    "
      style={{
        background:
          'linear-gradient(to top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))',
      }}
    >
      <div className="w-[30%] flex flex-col justify-center items-center gap-3 ">
        <h3 className="p-1  text-black font-semibold rounded-lg bg-white ">
          Words Per Minute
        </h3>
        <div
          className="w-20 h-20 rounded-[100%]  
                inline-flex items-center justify-center  
                backdrop-blur-2xl bg-white text-black text-xl font-bold"
        >
          {incrementwpm}
        </div>
      </div>
      <div className="w-[30%] flex flex-col justify-center items-center gap-3">
        <h3 className="p-1 bg-white text-black font-semibold rounded-lg">
          Letters Per Second
        </h3>
        <div
          className="w-20 h-20 rounded-[100%]   
                inline-flex items-center justify-center  
                bg-white text-gray-700 text-xl font-bold"
        >
          {incrementlps}
        </div>
      </div>
      <div className="w-[30%] flex flex-col justify-center items-center gap-3">
        <h3 className="p-1 bg-white text-black font-semibold rounded-lg">
          Time Taken second
        </h3>
        <div
          className="w-20 h-20 rounded-[100%]  
                inline-flex items-center justify-center  p-1
                bg-white text-gray-700 text-xl font-bold"
        >
          {incrementtt}
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;

import React, { useState, useEffect } from 'react';
const SuccessCardABCD = ({ lps, tt }) => {
  return (
    <div
      className="text-white p-5 rounded-xl flex gap-2 w-[550px] justify-around

    "
      style={{
        background:
          'linear-gradient(to top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))',
      }}
    >
      <div className="w-[30%] flex flex-col justify-center items-center gap-3">
        <h3 className="p-1 bg-white text-black font-semibold rounded-lg">
          Letters Per Second
        </h3>
        <div
          className="w-20 h-20 rounded-[100%]   
                inline-flex items-center justify-center  
                bg-white text-gray-700 text-xl font-bold"
        >
          {lps}
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
          {tt}
        </div>
      </div>
    </div>
  );
};

export default SuccessCardABCD;

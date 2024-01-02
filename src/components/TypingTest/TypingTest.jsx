import React, { useEffect } from 'react';
import { useState } from 'react';

const TypingTest = () => {
  const [start, setStart] = useState(false);
  const [paragraph, setParagraph] = useState(
    'The World is Great and i want this to be awesome'
  );
  const [typedWord, setTypedWord] = useState('The');

  /// function

  const generateParagraph = () => {
    return paragraph.split('').map((item, index) => {
      if (item === ' ') {
        return (
          <span
            key={index}
            className={`${typedWord[index] === item ? 'text-red' : ''}`}
          >
            {' '}
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className={`${typedWord[index] === item ? 'text-red-700' : ''}`}
          >
            {item}
          </span>
        );
      }
    });
  };

  useEffect(() => {
    const data = generateParagraph();
    console.log(data);
  }, []);
  return (
    <div className="h-full w-full bg-[#0d9488] flex flex-col justify-center items-top p-5">
      {/* <button className="bg-white px-6 py-2 rounded-xl">Start</button> */}
      <div className="h-[50%] w-[80%] bg-white rounded-md text-xl">
        {generateParagraph()}
      </div>
      <div>
        <input type="description" />
      </div>
    </div>
  );
};

export default TypingTest;

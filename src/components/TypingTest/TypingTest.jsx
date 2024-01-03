import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

const TypingTest = () => {
  /// initialization
  const inputRef = useRef(null);

  /// local state
  const [start, setStart] = useState(false);
  const [error, setError] = useState(false);
  const [testParagraph, setTestParagraph] = useState(
    'Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph.'
  );
  const [typedWord, setTypedWord] = useState('');
  const [nextWord, setNextWord] = useState('');

  /// handlers

  const handleLetterCheck = (event) => {
    const { value } = event.target;
    const { data: clickedValue } = event.nativeEvent;

    const currentWord = testParagraph[value.length - 1];
    const nextLetter = testParagraph[value.length];
    console.log(nextLetter);
    console.log(nextLetter === ' ');
    if (nextLetter === ' ') {
      setNextWord('Space');
    }

    if (clickedValue !== currentWord) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, [300]);
      return;
    }
    setNextWord(nextLetter);

    setTypedWord(value);
  };

  /// function

  const generateParagraph = () => {
    return testParagraph.split('').map((item, index) => {
      if (item === ' ') {
        return (
          <span
            key={index}
            className={`${typedWord[index] === item ? 'text-slate-600' : ''}`}
          >
            {' '}
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className={`${
              typedWord[index] === item ? 'text-black-900 font-bold' : ''
            } ${
              index === typedWord.length && error
                ? 'text-red-700  font-bold animate-bounce'
                : ''
            } `}
          >
            {item}
          </span>
        );
      }
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full w-full bg-[#0d9488] flex flex-col justify-between items-top p-5">
      <div className="w-[100%] h-[30%] flex justify-center items-center">
        <div className="flex gap-4 items-center">
          <div>Next Letter: </div>
          <button className="bg-white  rounded-xl mb-5">{nextWord}</button>
        </div>
      </div>

      {/* {Paragraph To Type for the test} */}
      <div className="h-[50%] w-[100%] bg-white rounded-md text-xl text-slate-600 p-6">
        {generateParagraph()}
      </div>
      <div className="w-[100%] h-[30%] flex justify-center items-center">
        <button className="bg-white  px-6 py-2 rounded-xl mb-5">Start</button>
      </div>

      {/* {Hidden Input Field to Take Input From User to Verify Letter chechk} */}
      <div className="mt-4 text-white opacity-0">
        <input
          type="text"
          ref={inputRef}
          value={typedWord}
          onChange={(e) => {
            handleLetterCheck(e);
          }}
        />
      </div>
    </div>
  );
};

export default TypingTest;

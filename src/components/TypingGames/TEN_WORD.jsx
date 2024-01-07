import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import typewriterSound from '../../assets/TypingSound1.mp3';
import wrongWordSound from '../../assets/WrongWordSound.mp3';
import { soundPlay } from '../../commonFunctions/commonFunctions';
import SuccessCardTenWord from '../../common/SuccessCardTenWord';
const data = [
  'iceCream',
  'world',
  'game',
  'apple',
  'banana',
  'orange',
  'pizza',
  'coffee',
  'book',
  'computer',
];

const TEN_WORD = () => {
  /// initialization
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /// local state
  const [wordCollection, setWordCollection] = useState([
    ...data.map((item) => item.toUpperCase()),
  ]);
  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTypedWord, setCurrentTypesWord] = useState('');
  const [error, setError] = useState(false);
  const [time, setTime] = useState({});
  const [stats, setStats] = useState([]);

  /// useEffect
  useEffect(() => {
    const handleClick = (event) => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Add a global click event listener
    document.addEventListener('click', handleClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  /// handlers

  const handleCheckWords = (e) => {
    let { value } = e.target;
    value = value.toUpperCase();
    let { data: clickedValue } = e.nativeEvent;
    clickedValue = clickedValue.toUpperCase();
    if (!currentTypedWord) {
      setTime({
        ...time,
        [wordCollection[currentWordIndex]]: {
          ...time[wordCollection[currentWordIndex]],
          startTime: Date.now(),
        },
      });
    }

    const currentLetter = wordCollection[currentWordIndex][value.length - 1];
    if (clickedValue !== currentLetter) {
      setError(true);
      soundPlay(wrongWordSound);

      setTimeout(() => {
        setError(false);
      }, [300]);
      return;
    }
    setCurrentTypesWord(value);
    soundPlay(typewriterSound);

    if (
      wordCollection[currentWordIndex].length ===
      currentTypedWord.length + 1
    ) {
      setTime({
        ...time,
        [wordCollection[currentWordIndex]]: {
          ...time[wordCollection[currentWordIndex]],
          endTime: Date.now(),
        },
      });

      if (wordCollection.length === currentWordIndex + 1) {
        setComplete(true);
        return;
      }
      setCurrentWordIndex((prev) => {
        return prev + 1;
      });
      setCurrentTypesWord('');
    }
  };

  /// functions
  const generateParagraph = () => {
    return wordCollection[currentWordIndex].split('').map((item, index) => {
      return (
        <div
          className={`h-16 w-16 flex items-center justify-center text-2xl text-center  ${
            currentTypedWord[index] === item
              ? 'bg-black text-white'
              : 'bg-white text-black'
          } ${
            index === currentTypedWord.length && error
              ? 'bg-red-600  font-bold animate-bounce'
              : ''
          } border border-gray-300 rounded-md shadow-md transition-transform duration-150 ease-out transform `}
          key={index}
        >
          {item}
        </div>
      );
    });
  };
  const calculateTimeInSeconds = (timestamps) => {
    const resultArray = [];
    let totalTime = 0;

    for (const [word, { startTime, endTime }] of Object.entries(timestamps)) {
      const durationInSeconds = (endTime - startTime) / 1000;
      resultArray.push({ name: word, timeTaken: durationInSeconds });
      totalTime += durationInSeconds;
    }

    return { result: resultArray, totalTime };
  };

  useEffect(() => {
    if (complete) {
      const data = calculateTimeInSeconds(time);
      setStats(data);
    }
  }, [complete]);

  const handleStart = () => {
    setStart(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTryAgain = () => {
    setStart(true);
    setComplete(false);
    setCurrentWordIndex(0);
    setCurrentTypesWord('');
    setError(false);
    setTime({});
    setStats({});
  };
  return (
    <div className="flex flex-col justify-center items-center mt-2">
      {!start && !complete ? (
        <div
          className=" text-white text-xl font-semibold text-center p-3 rounded-xl cursor-pointer hover:p-4"
          style={{
            background:
              'linear-gradient(to top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))',
          }}
          onClick={handleStart}
        >
          Let's Play
        </div>
      ) : (
        ''
      )}

      {start && !complete ? (
        <div className="w-[500px] h-[500px] rounded-full text-white flex justify-center items-center text-2xl">
          {generateParagraph()}
        </div>
      ) : (
        ''
      )}

      {complete ? (
        <div className="w-[100%] h-[30%] flex flex-col justify-center gap-4 items-center">
          {' '}
          <SuccessCardTenWord data={stats} />
          <div>
            {' '}
            <button
              className="px-6 py-2 rounded-xl mb-5 bg-white top-0 mr-3 "
              onClick={handleTryAgain}
            >
              Try Again
            </button>
            <button
              className="px-6 py-2 rounded-xl mb-5 bg-white top-0 "
              onClick={() => {
                navigate('/');
              }}
            >
              Go HomePage
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="mt-4 text-white opacity-0 ">
        <input
          type="text"
          ref={inputRef}
          value={currentTypedWord}
          onChange={(e) => {
            handleCheckWords(e);
          }}
        />
      </div>
    </div>
  );
};

export default TEN_WORD;

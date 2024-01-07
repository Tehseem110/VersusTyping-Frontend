import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import SuccessCard from '../../common/SuccessCard';
import { soundPlay } from '../../commonFunctions/commonFunctions';
import typewriterSound from '../../assets/TypingSound1.mp3';
import wrongWordSound from '../../assets/WrongWordSound.mp3';
import easterEggSound from '../../assets/EasterEggSound.mp3';
import { useNavigate } from 'react-router-dom';

let paragraph =
  "In the bustling realm of corporate monotony, Tehseem found solace in the vibrant camaraderie of his eclectic office group. Tanweer, the tech guru, breathed life into digital complexities. Saket's wit transformed mundane moments into laughter. Divyam's creativity sparked innovation, while Rishab's analytical mind navigated challenges seamlessly. Shanika's vivacity lit up the room, complemented by Ujjwal's calm demeanor that anchored the team. Together, they wove a tapestry of resilience and friendship, weathering deadlines and celebrating victories. In the symphony of their collective efforts, the office became more than just a workspace; it became a haven where bonds flourished, turning colleagues into a family.";

const TypingTest = () => {
  /// initialization
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /// local state
  const [start, setStart] = useState(false);
  const [bakchodSound, setBakchodSound] = useState(false);
  const [error, setError] = useState(false);
  const [successTyped, setSuccessTyped] = useState(false);
  const [testParagraph, setTestParagraph] = useState(paragraph);
  const [typedWord, setTypedWord] = useState('');
  const [nextWord, setNextWord] = useState(testParagraph[0]);
  const [time, setTime] = useState({
    startTime: '',
    endTime: '',
  });
  const [stats, setStats] = useState({});
  const [progressBar, setProgressBar] = useState(0);
  const [complete, setComplete] = useState(false);
  const [onEarthHover, setOnEarthHover] = useState(false);

  /// handlers

  const handleLetterCheck = (event) => {
    if (!typedWord) {
      setTime({ ...time, startTime: Date.now() });
    }
    const { value } = event.target;
    const { data: clickedValue } = event.nativeEvent;

    const currentWord = testParagraph[value.length - 1];
    const nextLetter = testParagraph[value.length];

    if (clickedValue !== currentWord) {
      let easterSound = bakchodSound ? easterEggSound : wrongWordSound;
      setError(true);
      soundPlay(easterSound);

      setTimeout(() => {
        setError(false);
      }, [300]);
      return;
    }

    if (testParagraph.length === typedWord.length + 1) {
      setTime({
        ...time,
        endTime: Date.now(),
      });
    }
    setNextWord(nextLetter);

    setSuccessTyped(true);
    setTimeout(() => {
      setSuccessTyped(false);
    }, [300]);
    setTypedWord(value);
    soundPlay(typewriterSound);
    const data = progressBarCalculator(testParagraph.length, value);
    setProgressBar(data);
  };

  const handleStart = () => {
    setStart(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOpenBakchodMode = () => {
    setBakchodSound(true);
  };

  console.log(bakchodSound);

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
            className={`${typedWord[index] === item ? 'text-white ' : ''} ${
              index === typedWord.length && error
                ? 'text-red-700  font-bold animate-bounce'
                : ''
            } mr-[2px] `}
          >
            {item}
          </span>
        );
      }
    });
  };

  const statsCalc = (paragraph) => {
    const { startTime, endTime } = time;
    const miliseconds = endTime - startTime;
    const seconds = Math.ceil(miliseconds / 1000);
    const lettersPerSecond = Math.ceil(paragraph.length / seconds);
    const wordsPerMinutes = Math.ceil(
      (paragraph.split(' ').length / seconds) * 60
    );

    setStats({ miliseconds, seconds, lettersPerSecond, wordsPerMinutes });
  };

  useEffect(() => {
    if (time.endTime) {
      statsCalc(testParagraph);
      setComplete(true);
    }
  }, [time]);

  useEffect(() => {
    const handleClick = (event) => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    if (start) {
      // Add a global click event listener
      document.addEventListener('click', handleClick);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [start]);

  const progressBarCalculator = (totalLength, enteredString) => {
    if (!enteredString || enteredString.length === 0 || totalLength === 0) {
      return 0;
    }

    return Math.ceil((enteredString.length / totalLength) * 100);
  };

  const handleTryAgain = () => {
    setStart(true);
    setError(false);
    setSuccessTyped(false);
    setTypedWord('');
    setNextWord(testParagraph[0]);
    setTime({ startTime: '', endTime: '' });
    setStats({});
    setProgressBar(0);
    setComplete(false);
  };

  // console.log(progressBar);

  return (
    <div className="h-full w-full  flex flex-col justify-center items-top p-5">
      {start && !complete ? (
        <div className="w-[100%] h-[30%] flex flex-col justify-center items-center gap-2">
          <div
            className="flex gap-4 items-center"
            onClick={handleOpenBakchodMode}
          >
            <div
              className={`h-16 w-16 flex items-center justify-center text-2xl text-center text-white-700 bg-white border border-gray-300 rounded-md shadow-md transition-transform duration-150 ease-out transform  ${
                successTyped ? 'translate-y-[-4px]' : ''
              }`}
            >
              {nextWord === ' ' ? (
                <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-space-bar_90666.png" />
              ) : (
                nextWord
              )}
            </div>
          </div>

          {/* {Paragraph To Type for the test} */}
          <div
            className=" max-w-[80%]    text-2xl text-black-900 p-6 backdrop-blur-2xl rounded-2xl"
            style={{
              background:
                'linear-gradient(to top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))',
            }}
          >
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className={`bg-[#0f172a] h-2.5 rounded-full `}
                style={{
                  width: `${progressBar}%`,
                }}
              ></div>
            </div>
            {generateParagraph()}
          </div>
        </div>
      ) : (
        ''
      )}
      {!complete && !start ? (
        <div className="w-[100%] h-[30%] flex justify-center items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden  group">
            <div
              className="group-hover:z-10 cursor-pointer"
              onClick={handleStart}
            >
              <img
                src="https://www.svgrepo.com/show/417219/earth.svg"
                className="w-full h-full object-cover rounded-full transition-transform transform hover:-translate-y-7"
                style={{
                  transform: onEarthHover ? 'translateY(-35px)' : '', // Adjust the value based on your needs
                  // Add other styles as needed
                }}
              />
              <div
                className="absolute bottom-2 left-0 right-0 text-center bg-white text-black text-2xl font-semibold backdrop-blur-xl hover:bg-black hover:text-white"
                onMouseOver={() => {
                  setOnEarthHover(true);
                }}
                onMouseLeave={() => {
                  setOnEarthHover(false);
                }}
              >
                Start
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {complete ? (
        <div className="w-[100%] h-[30%] flex flex-col justify-center gap-4 items-center">
          {' '}
          <SuccessCard
            tt={stats.seconds}
            lps={stats.lettersPerSecond}
            wpm={stats.wordsPerMinutes}
          />
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

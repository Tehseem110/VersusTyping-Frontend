import React, { useEffect, useState, useRef } from 'react';
import typewriterSound from '../../assets/TypingSound1.mp3';
import wrongWordSound from '../../assets/WrongWordSound.mp3';
import { soundPlay } from '../../commonFunctions/commonFunctions';
import SuccessCardABCD from '../../common/SuccessCardABCD';
import { useNavigate } from 'react-router-dom';

const data = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ABCD_RANDOM = () => {
  /// initialization
  const inputRef = useRef(null);
  const navigate = useNavigate();

  /// local state
  const [start, setStart] = useState(false);
  const [error, setError] = useState(false);
  const [alphabet, setAlphabet] = useState(data);
  const [typedAlphabet, setTypedAlphabet] = useState('');
  const [progressBar, setProgressBar] = useState(0);
  const [complete, setComplete] = useState(false);
  const [stats, setStats] = useState({});
  const [letterHashMap, setLetterHashMap] = useState({});
  const [time, setTime] = useState({
    startTime: '',
    endTime: '',
  });

  /// useEffect

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

  useEffect(() => {
    if (time.endTime) {
      statsCalc(alphabet);
      setComplete(true);
    }
  }, [time]);

  const handleLetterCheck = (event) => {
    if (!typedAlphabet) {
      setTime({ ...time, startTime: Date.now() });
    }

    let { value } = event.target;
    value = value.toUpperCase();

    let { data: clickedValue } = event.nativeEvent;
    clickedValue = clickedValue.toUpperCase();

    const currentWord = alphabet[value.length - 1];
    console.log(currentWord);

    if (typedAlphabet.split('').includes(clickedValue) || !alphabet.split('').includes(clickedValue)) {
      console.log('error');
      return;
    }

    if (alphabet.length === typedAlphabet.length + 1) {
      setTime({
        ...time,
        endTime: Date.now(),
      });
    }

    setTypedAlphabet(value);
    setLetterHashMap({ ...letterHashMap, [clickedValue]: true });
    soundPlay(typewriterSound);
    const data = progressBarCalculator(alphabet.length, value);
    setProgressBar(data);
  };

  const handleStart = () => {
    setStart(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTryAgain = () => {
    setStart(true);
    setError(false);
    setTypedAlphabet('');
    setTime({ startTime: '', endTime: '' });
    setStats({});
    setProgressBar(0);
    setComplete(false);
    setLetterHashMap({});
  };

  /// function
  const progressBarCalculator = (totalLength, enteredString) => {
    if (!enteredString || enteredString.length === 0 || totalLength === 0) {
      return 0;
    }

    return Math.ceil((enteredString.length / totalLength) * 100);
  };

  const statsCalc = (paragraph) => {
    const { startTime, endTime } = time;
    const miliseconds = endTime - startTime;
    const seconds = +(miliseconds / 1000).toFixed(1);
    const lettersPerSecond = +(paragraph.length / seconds).toFixed(1);

    setStats({ miliseconds, seconds, lettersPerSecond });
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      {/* {Aphabet look} */}

      {start && !complete ? (
        <div className="w-[50%]  flex flex-wrap gap-2 justify-center">
          {alphabet.split('').map((item, index) => {
            return (
              <div
                className={`h-16 w-16 flex items-center justify-center text-2xl text-center  ${letterHashMap[item] ? 'bg-black text-white' : 'bg-white text-black'} ${
                  index === typedAlphabet.length && error ? 'bg-red-600  font-bold animate-bounce' : ''
                } border border-gray-300 rounded-md shadow-md transition-transform duration-150 ease-out transform `}
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
      {!complete && !start ? (
        <div className="w-[100px] rounded-full bg-white hover:w-[120px] relative" onClick={handleStart}>
          <img src="https://ik.imagekit.io/f68owkbg7/verusTyping/assests/jupiter-svgrepo-com%20(1).svg?updatedAt=1704612909699" className="bg-cover cursor-pointer" />
          <i className="fa fa-play-circle absolute top-8 left-0 right-0 text-center  text-black text-2xl font-semibold" aria-hidden="true">
            play
          </i>
        </div>
      ) : (
        ''
      )}
      {complete ? (
        <div className="w-[100%] h-[30%] flex flex-col justify-center gap-4 items-center">
          <SuccessCardABCD lps={stats.lettersPerSecond} tt={stats.seconds} />
          <div>
            {' '}
            <button className="px-6 py-2 rounded-xl mb-5 bg-white top-0 mr-3 " onClick={handleTryAgain}>
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
      <div className="mt-4 text-white opacity-0 ">
        <input
          type="text"
          ref={inputRef}
          value={typedAlphabet}
          onChange={(e) => {
            handleLetterCheck(e);
          }}
        />
      </div>
    </div>
  );
};

export default ABCD_RANDOM;

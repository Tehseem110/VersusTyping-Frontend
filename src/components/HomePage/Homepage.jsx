import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gameItems } from './data/gameOption';
import { soundPlay } from '../../commonFunctions/commonFunctions';
import bubbleSound from '../../assets/BubbleSound1.mp3';

const Homepage = () => {
  /// instance
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <div className="w-full h-[200px] flex justify-center p-3 gap-3">
        {gameItems.map((item, index) => (
          <div
            onMouseEnter={() => {
              console.log('sound');
              soundPlay(bubbleSound);
            }}
            key={index}
            className="w-[170px] h-[170px] p-4 text-white text-2xl font-serif font-semibold flex justify-center rounded-full items-center cursor-pointer text-center hover:-translate-y-2"
            style={{
              background:
                'linear-gradient(to top, rgb(17, 24, 39), rgb(88, 28, 135), rgb(124, 58, 237))',
            }}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;

import './App.css';
import Navbar from './common/Navbar';
import { Route, Routes } from 'react-router-dom';
import SuccessCard from './common/SuccessCard';
import ParagraphTest from './components/TypingGames/ParagraphTest';
import Homepage from './components/HomePage/Homepage';
import NoRoutePage from './common/NoRoutePage';
import ABCD_SEQUENCE from './components/TypingGames/ABCD_SEQUENCE';
import ABCD_RANDOM from './components/TypingGames/ABCD_RANDOM';
import TEN_WORD from './components/TypingGames/TEN_WORD';

function App() {
  return (
    <div className=" h-screen w-screen flex flex-col  bg-[url('https://ik.imagekit.io/f68owkbg7/verusTyping/Background%20Images/5539148.jpg?updatedAt=1704541442230')] bg-cover  ">
      <Navbar />
      <div className="h-[95%] w-full  items-center flex justify-center">
        <Routes>
          <Route path="*" element={<NoRoutePage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/paraTest" element={<ParagraphTest />} />
          <Route path="/abcdSeq" element={<ABCD_SEQUENCE />} />
          <Route path="/abcdRan" element={<ABCD_RANDOM />} />
          <Route path="/tenWord" element={<TEN_WORD />} />
        </Routes>
        {/* <TypingTest /> */}
        {/* <SuccessCard wpm={66} tt={44} lps={66} /> */}
      </div>
    </div>
  );
}

export default App;

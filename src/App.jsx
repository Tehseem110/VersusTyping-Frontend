import './App.css';
import Navbar from './common/Navbar';
import SuccessCard from './common/SuccessCard';
import TypingTest from './components/TypingTest/TypingTest';

function App() {
  return (
    <div className=" h-screen w-screen flex flex-col  bg-[url('https://ik.imagekit.io/f68owkbg7/verusTyping/Background%20Images/5539148.jpg?updatedAt=1704541442230')] bg-cover  ">
      <Navbar />
      <div className="h-[95%]  items-center flex justify-center">
        <TypingTest />
        {/* <SuccessCard wpm={66} tt={44} lps={66} /> */}
      </div>
    </div>
  );
}

export default App;

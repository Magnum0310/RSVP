import "./App.css";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";
import Timeline from "./components/TimeLine";

function App() {
  return (
    <>
      <div className="">
        <Hero />
      </div>
      <div className="relative">
        <Entourage />
      </div>
      <div className="">
        <Details />
      </div>
      <div>
        <Timeline />
      </div>
      <div className="h-screen bg-emerald-500"></div>
    </>
  );
}

export default App;

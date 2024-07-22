import "./App.css";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";
import Timeline from "./components/TimeLine";
import Church from "./components/ChurchLocation";

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
      <div className="">
        <Timeline />
      </div>
      <div className="h-screen">
        <Church />
      </div>
      <div className="h-screen bg-slate-500/0"></div>
    </>
  );
}

export default App;

import "./App.css";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";
import Timeline from "./components/TimeLine";
import Church from "./components/ChurchLocation";
import Reception from "./components/ReceptionLocation";

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
      <div className="">
        <Church />
      </div>
      <div className="">
        <Reception />
      </div>
      <div className="h-screen"></div>
    </>
  );
}

export default App;

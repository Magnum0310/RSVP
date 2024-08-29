import "./App.css";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";
import Timeline from "./components/TimeLine";
import Church from "./components/ChurchLocation";
import Reception from "./components/ReceptionLocation";

function App() {
  return (
    <div className="lg:overflow-clip">
      <div className="mx-auto flex w-full max-w-[1440px] justify-center">
        <Hero />
      </div>
      <div className="mx-auto max-w-[1440px]">
        <Entourage />
      </div>
      <div className="mx-auto max-w-[1440px]">
        <Details />
      </div>
      <div className="">
        <Timeline />
      </div>
      <div className="mx-auto max-w-[1440px]">
        <Church />
      </div>
      <div className="mx-auto max-w-[1440px]">
        <Reception />
      </div>
      {/* <div className="h-screen"></div> */}
    </div>
  );
}

export default App;

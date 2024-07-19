import "./App.css";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";

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
      <div>TEST</div>
    </>
  );
}

export default App;

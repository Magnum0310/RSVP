import { useEffect, useContext } from "react";
import { UserFormProvider } from "./context/UserformContext";
import "./App.css";
import Lenis from "lenis";
import Hero from "./components/HeroPage";
import Entourage from "./components/Entourage";
import Details from "./components/Details";
import Timeline from "./components/TimeLine";
import Church from "./components/ChurchLocation";
import Reception from "./components/ReceptionLocation";
import AdminPanel from "./components/AdminPanel";
import UserForm from "./components/UserForm";
import AcceptInvite from "./components/AcceptInvite";

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    // <div className="lg:overflow-clip">
    <div className="overflow-clip">
      <UserFormProvider>
        {/* <div className="border-draft mx-auto flex w-full max-w-[1440px] justify-center"> */}
        {/* <div className="mx-auto flex w-full justify-center">
          <Hero />
        </div> */}
        <div className="mx-auto max-w-[1440px]">
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
        <div className="mx-auto h-screen max-w-[1440px]">
          <UserFormProvider>
            <UserForm />
          </UserFormProvider>
        </div>
        {/* <div className="mx-auto h-screen max-w-[1440px]">
        <UserFormProvider>
          <AcceptInvite />
        </UserFormProvider>
      </div> */}
        {/* <div className="mx-auto h-[25vh] max-w-[1440px]"></div> */}
      </UserFormProvider>
    </div>
  );
}

export default App;

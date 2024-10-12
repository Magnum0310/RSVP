import { useLayoutEffect, useRef } from "react";
import Image from "../constants/Image";
import Details from "../constants/timeLine.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Frame from "./Frame";

gsap.registerPlugin(ScrollTrigger);

const { timeLineDivider, timeLineFrame, entourageTransition } = Image;

const TimeLine = () => {
  const transition = useRef(null);
  const timeLineContents = useRef(null);
  const timeLineTitle = useRef(null);
  const backgroundTransition = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: transition.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(timeLineContents.current, { y: "-15%" }, 0)
        .to(timeLineTitle.current, { y: "-50%" }, 0)
        .to(backgroundTransition.current, { x: -150 }, 0);
    });
    return () => context.revert();
  }),
    [];

  return (
    <div className="relative">
      <div
        ref={transition}
        className="relative flex hidden w-full flex-col items-center overflow-clip bg-blue-500 lg:py-12"
      >
        <div className="flex h-full w-full max-w-[1024px] flex-col items-center">
          <div className="relative flex h-[150px] w-full justify-center">
            <div
              ref={timeLineTitle}
              className="absolute top-[25%] z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl lg:text-5xl"
            >
              <p>The Timeline</p>
            </div>
          </div>
          {/* Main Content Box */}
          <div
            ref={timeLineContents}
            className="relative flex h-[100vh] w-[100%] -translate-y-[0%] justify-center sm:w-[90%] lg:h-[150vh]"
          >
            {/* Frame - Position:Absolute */}
            <div
              className="absolute top-[5%] size-full sm:top-[60%] sm:h-[90%] sm:-translate-y-1/2 md:h-[100%] lg:h-[90%]"
              style={{
                backgroundImage: `url("${timeLineFrame}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            {/* Timeline contents */}
            <div className="absolute top-[5%] flex h-[75%] w-full translate-y-[17%] flex-col items-center justify-center font-Coldiac sm:top-[10%]">
              {Details.map((detail, index) => (
                <div
                  key={index}
                  // className="mb-5 flex w-[75%] gap-5 bg-red-500 sm:mb-10 lg:w-[75%]"
                  className="mb-5 flex w-[85%] gap-10 sm:mb-10 md:w-[65%] lg:w-[75%]"
                >
                  <div className="flex basis-1/2 justify-center gap-3">
                    <span className="text-time flex min-h-[50px] items-center font-MoreLight">
                      {detail.time}
                    </span>
                    <span className="text-time-md flex items-center font-MoreLight">
                      {detail.med}
                    </span>
                  </div>
                  {/* <div className="text-entourage-list basis-1/2 place-content-center text-left lg:pl-10 lg:pr-5"> */}
                  <div className="text-entourage-list basis-1/2 place-content-center pl-5 text-left md:pl-10">
                    {detail.event}
                  </div>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div
              // className="absolute top-[5%] size-[100%] bg-blue-500 opacity-25 sm:top-[13%] sm:size-[95%] md:top-[55%] md:w-[75%] md:-translate-x-1/2 lg:top-[50%]"
              className="absolute top-[5%] size-[100%] rotate-90 opacity-25 sm:top-[13%] sm:size-[95%] md:w-[75%] lg:w-[95%]"
              style={{
                backgroundImage: `url("${timeLineDivider}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                // rotate: "90deg",
              }}
            ></div>
            {/* BackgroundImage */}
            <div
              ref={backgroundTransition}
              className="absolute left-[80%] top-0 h-full w-[135%] opacity-25"
              style={{
                backgroundImage: `url("${entourageTransition}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                scale: "1",
              }}
            ></div>
          </div>
        </div>
      </div>
      <Frame />
    </div>
  );
};

export default TimeLine;

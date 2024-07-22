import { useLayoutEffect, useRef } from "react";
import Image from "../constants/Image";
import Details from "../constants/timeLine.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { timeLineDivider, timeLineFrame, entourageTransition } = Image;

const TimeLine = () => {
  const transition = useRef(null);
  const timeLineContents = useRef(null);
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
        .to(backgroundTransition.current, { x: -150 }, 0);
    });
    return () => context.revert();
  }),
    [];

  return (
    <div
      ref={transition}
      className="relative flex flex-col items-center overflow-hidden"
    >
      <div className="relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl">
        The Timeline
      </div>
      {/* Main Content Box */}
      <div
        ref={timeLineContents}
        className="relative flex h-[100vh] w-[100%] -translate-y-[0%] justify-center"
      >
        {/* Frame - Position:Absolute */}
        <div
          className="absolute top-0 size-full"
          style={{
            backgroundImage: `url("${timeLineFrame}")`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {/* Timeline contents */}
        <div className="absolute top-1/2 flex h-[75%] w-full -translate-y-1/2 flex-col items-center justify-center font-Coldiac">
          {Details.map((detail, index) => (
            <div key={index} className="mb-5 flex w-[90%] gap-5">
              <div className="flex basis-1/2 justify-center gap-2">
                <span className="flex min-h-[50px] items-center font-MoreLight text-2xl">
                  {detail.time}
                </span>
                <span className="flex items-center font-MoreLight text-xl">
                  {detail.med}
                </span>
              </div>
              <div className="basis-1/2 place-content-center text-left text-xs">
                {detail.event}
              </div>
            </div>
          ))}
        </div>
        {/* Divider */}
        <div
          className="absolute top-0 h-full w-[100%] opacity-25"
          style={{
            backgroundImage: `url("${timeLineDivider}")`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            rotate: "90deg",
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
  );
};

export default TimeLine;

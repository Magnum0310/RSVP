import { useLayoutEffect, useRef } from "react";
import Image from "../constants/Image";
import Details from "../constants/timeLine.json";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Frame from "./Frame";

gsap.registerPlugin(ScrollTrigger);

const {
  timeLineDivider,
  timeLineFrame,
  entourageTransition,
  rings,
  camera,
  reception,
  utensils,
  celebration,
  couples,
} = Image;

const icons = [rings, camera, reception, utensils, celebration];

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
        className="relative flex w-full flex-col items-center lg:py-12"
      >
        <div className="flex h-full w-full max-w-[1024px] flex-col items-center">
          <div className="relative flex h-[150px] w-full justify-center">
            <div
              ref={timeLineTitle}
              className="absolute top-[25%] z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl lg:text-5xl"
            >
              <p>Wedding Timeline</p>
            </div>
          </div>
          {/* Main Content Box */}
          <div
            ref={timeLineContents}
            className="relative flex h-[100vh] w-[100%] -translate-y-[0%] justify-center sm:w-[90%] lg:h-[150vh]"
          >
            {/* Frame - Position:Absolute */}
            <div
              className="absolute -top-[2%] size-full sm:top-[60%] sm:h-[90%] sm:-translate-y-1/2 md:h-[100%] lg:h-[90%]"
              style={{
                backgroundImage: `url("${timeLineFrame}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            {/* Timeline contents */}
            <div className="absolute -top-[2%] flex h-[75%] w-full translate-y-[17%] flex-col items-center justify-center font-Coldiac sm:top-[10%]">
              {Details.map((detail, index) => (
                <div
                  key={index}
                  // className="mb-5 flex w-[75%] gap-5  sm:mb-10 lg:w-[75%]"
                  // className="mb-5 flex w-[65%] gap-10 max-sm:w-[85%] sm:mb-10 md:w-[55%] lg:w-[75%]"
                  className="mb-5 flex w-[65%] justify-evenly max-sm:w-[85%] sm:mb-10 md:w-[55%] lg:w-[75%]"
                >
                  {detail.time === "1:00" ? (
                    <div className="flex flex-1 basis-1/4 flex-col items-center justify-center">
                      <span className="flex items-center justify-center font-MoreLight sm:gap-3 lg:gap-0">
                        <span className="text-time min-w-[65px] text-center lg:min-w-[165px]">
                          <p>{detail.time}</p>
                        </span>
                        <span className="text-time-md flex items-center font-MoreLight">
                          <p>{detail.med}</p>
                        </span>
                      </span>
                      <span className="text-xs sm:text-base md:text-lg lg:text-xl">
                        (onwards)
                      </span>
                    </div>
                  ) : (
                    // <div className="flex basis-1/3 justify-center sm:gap-3 lg:gap-0">
                    <div className="flex flex-1 basis-1/4 justify-center">
                      <span className="text-time flex min-h-[50px] min-w-[65px] items-center justify-center font-MoreLight lg:min-w-[165px]">
                        <p>{detail.time}</p>
                      </span>
                      <span className="text-time-md flex items-center font-MoreLight">
                        <p>{detail.med}</p>
                      </span>
                    </div>
                  )}
                  <div
                    className="text-entourage-list basis-[15%] scale-75 place-content-center pl-5 text-left max-sm:scale-[.65] md:pl-10"
                    style={{
                      backgroundImage: `url("${icons[index]}")`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="text-entourage-list flex-1 basis-[30%] place-content-center pl-5 text-left md:pl-10">
                    {detail.event}
                  </div>
                </div>
              ))}
            </div>
            {/* Divider */}
            <div
              // className="absolute top-[5%] size-[100%]  opacity-25 sm:top-[13%] sm:size-[95%] md:top-[55%] md:w-[75%] md:-translate-x-1/2 lg:top-[50%]"
              className="absolute top-[5%] hidden size-[100%] rotate-90 opacity-25 sm:top-[13%] sm:size-[95%] md:w-[75%] lg:w-[95%]"
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
              // ref={backgroundTransition}
              className="absolute -top-[30%] left-1/4 hidden h-full w-1/2 scale-[.25] opacity-100"
              style={{
                backgroundImage: `url("${couples}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* <Frame /> */}
    </div>
  );
};

export default TimeLine;

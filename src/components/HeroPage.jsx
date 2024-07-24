import { useLayoutEffect, useRef, useEffect } from "react";
import Image from "../constants/Image";
import Card from "../components/LocationCard";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const {
  heroPageMain,
  heroPageDate,
  floralMid,
  floralLeaf1,
  floralLeaf2,
  floralTransition,
  floralFlower,
} = Image;

const HeroPage = () => {
  const container = useRef(null);
  const title = useRef(null);
  const titleImage = useRef(null);
  const floral = useRef(null);
  const floralLeaf = useRef(null);
  const stem = useRef(null);
  const transition = useRef(null);
  const transitionBottom = useRef(null);
  const imageDate = useRef(null);
  const dateContainer = useRef(null);
  const date = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            // end: "+=135%",
            end: "center top",
            scrub: true,
          },
        })
        .to(titleImage.current, { rotate: "-3deg" })
        .to(floral.current, { y: -250 }, 0)
        .to(floralLeaf.current, { y: 150 }, 0)
        .to(stem.current, { y: 350 }, 0)
        .to(transition.current, { y: -150 }, 0)
        .to(transitionBottom.current, { y: -175 }, 0)
        .to(imageDate.current, { scale: ".9", rotate: "2deg", y: -250 }, 0);
      // .to(dateContainer.current, { y: -250 }, 0);
    });
    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: dateContainer.current,
            start: "top bottom",
            end: "20% 65%",
            scrub: true,
          },
        })
        .to(
          date.current,
          {
            color: "#000000",
            // y: -600,
            // y: `-${window.innerHeight / 4.5}%`,
            ease: "expo",
          },
          0,
        )
        .to(
          title.current,
          {
            rotate: "2deg",
            color: "#FFFFFF",
            y: `${window.innerHeight / 2 - 20}%`,
            ease: "expo",
          },
          0,
        );
    });
    return () => context.revert();
  }, []);

  return (
    // Main page
    <div className="h-[200svh] min-h-[200vh]">
      {/* Inner Wrapper */}
      <div
        ref={container}
        className="relative flex size-full flex-col items-center"
      >
        {/* Jeffrey and Jonalyn */}
        <div
          ref={title}
          className="relative top-[5%] z-10 size-fit text-center font-Showtime text-8xl"
        >
          <p>Jeffrey</p>
          <p className="text-5xl">and</p>
          <p>Jonalyn</p>
        </div>
        {/* HeroImage */}
        <div
          ref={titleImage}
          className="h-full w-[90%] opacity-100"
          // style={{
          //   backgroundImage: `url(${heroPageMain})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "left",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <Card image={heroPageMain} />
        </div>
        {/* Parallax Slides - Top - Position:Relative */}
        <div
          className="absolute top-[5%] -z-10 h-full w-full overflow-hidden"
          ref={floral}
        >
          {/* Flower - Position:Absolute */}
          <div
            className="absolute right-0 h-[10%] w-1/2"
            style={{
              backgroundImage: `url(${floralFlower})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Leaf - Left */}
          <div
            ref={floralLeaf}
            className="absolute top-[5%] h-[10%] w-1/2"
            style={{
              backgroundImage: `url(${floralLeaf1})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Leaf - Right */}
          <div
            className="absolute right-0 top-[5%] h-[10%] w-1/2"
            style={{
              backgroundImage: `url(${floralLeaf2})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Flower Stem */}
          <div
            ref={stem}
            className="absolute right-0 top-[10%] h-1/2 w-1/2"
            style={{
              backgroundImage: `url(${floralMid})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              rotate: "-65deg",
              scale: "3",
            }}
          ></div>
        </div>
        {/* Parallax Slides - Bottom - Position:Relative */}
        <div className="absolute -z-10 h-full w-full overflow-hidden">
          {/* Flower Stem */}
          <div
            ref={transition}
            className="absolute bottom-[8%] right-[90%] h-1/2 w-1/2"
            style={{
              backgroundImage: `url(${floralMid})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              rotate: "180deg",
              scale: "2.5",
            }}
          ></div>
          <div
            ref={transitionBottom}
            className="absolute -bottom-[15%] right-[90%] h-1/2 w-1/2"
            style={{
              backgroundImage: `url(${floralMid})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              rotate: "90deg",
              scale: "3",
            }}
          ></div>
        </div>
        {/* Spacer */}
        <div className="h-[50vh]"></div>
        {/* HeroDate */}
        {/*Date*/}

        {/* <div
          ref={date}
          className="absolute bottom-[10%] z-30 bg-blue-500 text-center font-Showtime text-5xl"
        >
          <p>12.16.24</p>
          <p>Baguio City</p>
        </div> */}
        <div
          ref={imageDate}
          className="relative top-[6%] -z-10 h-[200vh] w-full"
          // style={{
          //   backgroundImage: `url(${heroPageDate})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center right 40%",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <Card image={heroPageDate} />
          <div
            ref={date}
            className="absolute bottom-[3%] left-1/2 z-30 -translate-x-1/2 text-center font-Showtime text-5xl"
          >
            <p>12.16.24</p>
            <p>Baguio City</p>
          </div>
        </div>
        <div
          ref={dateContainer}
          className="absolute bottom-0 h-1/4 w-full"
        ></div>
      </div>
    </div>
  );
};

export default HeroPage;

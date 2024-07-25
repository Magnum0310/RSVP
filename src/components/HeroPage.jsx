import { useLayoutEffect, useRef, useEffect } from "react";
import Image from "../constants/Image";
import Card from "../components/LocationCard";
import Lenis from "lenis";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(false);

const {
  heroPageMain,
  heroPageMainMask,
  heroPageDate,
  heroPageMask,
  floralMid,
  floralLeaf1,
  floralLeaf2,
  floralTransition,
  floralFlower,
} = Image;

const ParallaxImage = ({ image, track, date }) => {
  return (
    <div className="relative flex size-full flex-col items-center justify-center bg-white font-Showtime">
      <div className="relative flex size-[90%] flex-col items-center gap-2">
        <div
          className="relative w-full basis-[85%]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute top-0 z-20 size-full bg-blue-500/0"
            style={{
              backgroundImage: `url(${heroPageMask})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span
            ref={date}
            className="absolute left-1/2 top-[75%] z-10 h-fit w-full min-w-fit -translate-x-1/2 text-center text-7xl text-white"
          >
            Save the Date
          </span>
        </div>
        <div className="flex basis-[10%] flex-col items-center gap-2 text-center text-5xl">
          <span>
            <p className="">12.16.24</p>
            <span className="">Baguio City</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const HeroPage = () => {
  const container = useRef(null);
  const title = useRef(null);
  const titleContainer = useRef(null);
  const heroImage = useRef(null);
  const heroMask = useRef(null);
  const floral = useRef(null);
  const floralLeaf = useRef(null);
  const stem = useRef(null);
  const transition = useRef(null);
  const transitionBottom = useRef(null);
  const imageDate = useRef(null);
  const dateContainer = useRef(null);
  const date = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "20% 40%",
            // end: "+=135%",
            end: "bottom 85%",
            scrub: true,
          },
        })
        // .to(
        //   title.current,
        //   { opacity: 0, ease: "expo.inOut", y: `${window.innerHeight / 2}%` },
        //   0,
        // )
        // .to(titleContainer.current, { y: "0%" }, 0)
        .to(floral.current, { y: -250 }, 0)
        .to(floralLeaf.current, { y: 150 }, 0)
        .to(stem.current, { y: 350 }, 0)
        .to(transition.current, { y: -250 }, 0)
        .to(transitionBottom.current, { y: "15%" }, 0)
        .to(imageDate.current, { rotate: "1deg", y: -350 }, 0);
    });
    return () => context.revert();
  }, []);

  //################

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: titleContainer.current,
            start: "15% 15%",
            end: "100% 65%",
            scrub: true,
          },
        })
        .to(title.current, {
          y: 500,
          opacity: 1,
          ease: "power1.inOut",
        });
    });
    return () => context.revert();
  }, []);

  // ###############

  // Date
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: dateContainer.current,
            start: "25% 60%",
            end: "55% 35%",
            scrub: true,
          },
        })
        .to(
          date.current,
          {
            y: `-${window.innerHeight / 2}%`,
            ease: "expo",
          },
          0,
        );
    });
    return () => context.revert();
  }, []);

  return (
    // Main page
    // <div className="min-h-[200vh] overflow-hidden">
    <div className="h-[250lvh] overflow-hidden">
      {/* Inner Wrapper */}
      <div
        ref={container}
        className="relative flex size-full flex-col items-center"
      >
        {/* TitleContainer */}
        {/* ##################### */}
        <div
          ref={titleContainer}
          className="relative top-[0%] flex h-1/2 w-full flex-col items-center gap-2"
        >
          <div
            ref={heroImage}
            className="relative top-[0%] size-full"
            style={{
              backgroundImage: `url(${heroPageMain})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            ref={heroMask}
            className="absolute top-[0%] z-20 size-full"
            style={{
              backgroundImage: `url(${heroPageMainMask})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          {/* Jeffrey and Jonalyn */}
          <div
            ref={title}
            className="absolute top-[10%] size-fit text-center font-Showtime text-7xl text-white"
          >
            <p>Jeffrey</p>
            <p className="text-4xl">and</p>
            <p>Jonalyn</p>
          </div>
        </div>
        {/* ##################### */}

        {/* Parallax Slides - Top - Position:Relative */}
        <div
          className="absolute top-[5%] -z-10 h-full w-full overflow-hidden"
          ref={floral}
        >
          {/* Flower - Position:Absolute */}
          <div
            className="absolute right-0 hidden h-[10%] w-1/2"
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
            className="absolute top-[5%] hidden h-[10%] w-1/2"
            style={{
              backgroundImage: `url(${floralLeaf1})`,
              backgroundSize: "contain",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/* Leaf - Right */}
          <div
            className="absolute right-0 top-[5%] hidden h-[10%] w-1/2"
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
            className="absolute bottom-0 right-[90%] z-20 h-1/2 w-1/2"
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
          className="relative top-[6%] -z-10 h-1/2 w-full"
          // style={{
          //   backgroundImage: `url(${heroPageDate})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "center right 40%",
          //   backgroundRepeat: "no-repeat",
          // }}
        >
          <ParallaxImage
            image={heroPageDate}
            // track={dateContainer}
            date={date}
          />
          <div
            // ref={date}
            className="absolute bottom-[3%] left-1/2 z-30 hidden -translate-x-1/2 text-center font-Showtime text-5xl"
          >
            <p>12.16.24</p>
            <p>Baguio City</p>
          </div>
        </div>
        <div
          ref={dateContainer}
          className="absolute bottom-1/4 h-1/4 w-full"
        ></div>
      </div>
    </div>
  );
};

export default HeroPage;

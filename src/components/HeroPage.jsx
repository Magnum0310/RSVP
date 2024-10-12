import { useLayoutEffect, useRef, useEffect, useContext } from "react";
import Image from "../constants/Image";
// import Card from "../components/LocationCard";
import Lenis from "lenis";
import UserformContext from "@/context/UserformContext";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(false);

const {
  heroPageMain,
  heroPageMainMask,
  heroPageDate,
  heroPageMask,
  floralFlower,
  heroPhoto1,
  heroPhoto2,
  flower1,
  flower2,
  flower3,
  flowerStem,
  frame,
} = Image;

const ParallaxImage = ({ image, date }) => {
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
            className="absolute left-1/2 top-[75%] z-10 h-fit w-full min-w-fit -translate-x-1/2 text-center text-6xl text-white sm:text-8xl lg:top-[95%] lg:text-9xl"
          >
            Save the Date
          </span>
        </div>
        <div className="flex basis-[10%] flex-col items-center gap-2 text-center text-5xl lg:text-6xl">
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
  const transition = useRef(null);
  const transitionBottom = useRef(null);
  const imageDate = useRef(null);
  const dateContainer = useRef(null);
  const date = useRef(null);
  const photo1 = useRef(null);
  const photo2 = useRef(null);
  const flower1Position = useRef(null);
  const flower2Position = useRef(null);
  const flower3Position = useRef(null);

  const { width } = useContext(UserformContext);
  console.log(width);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // HeroPage Main Image
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "20% 40%",
            end: "bottom 85%",
            scrub: true,
          },
        })
        .to(floral.current, { y: -250 }, 0)
        .to(flower1Position.current, { rotate: "55deg" }, 0)
        .to(flower2Position.current, { rotate: "35deg" }, 0)
        .to(flower3Position.current, { rotate: "40deg" }, 0)
        .to(transition.current, { y: 150 }, 0)
        .to(imageDate.current, { rotate: "1deg", y: -450 }, 0);
    });
    return () => context.revert();
  }, []);
  // Jeffrey and Jonnalyn
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
          y: `${innerHeight / 2}%`,
          opacity: 0,
          ease: "power1.inOut",
        });
    });
    return () => context.revert();
  }, []);
  // Save the Date
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
            y: `-${window.innerHeight / 2.5}%`,
            ease: "expo",
          },
          0,
        );
    });
    return () => context.revert();
  }, []);
  // Photo Transition
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: dateContainer.current,
            start: "40% 80%",
            end: "bottom 35%",
            scrub: true,
          },
        })
        .to(photo1.current, { x: "110%", ease: "expo.inOut", y: "15%" }, 0)
        .to(photo2.current, { x: "-110%", ease: "expo.inOut", y: "15%" }, 0);
    });
    return () => context.revert();
  }, []);

  return (
    // Main page
    <div className="relative flex size-full justify-center">
      <div className="relative h-[250lvh] w-full max-w-[1024px] overflow-clip sm:h-[350lvh] lg:overflow-visible">
        {/* Inner Wrapper */}
        <div
          ref={container}
          className="relative flex size-full flex-col items-center"
        >
          {/* TitleContainer */}
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
              className="text-jeff-jona absolute top-[10%] size-fit text-center font-Showtime text-white"
            >
              <p>Jeffrey</p>
              <p className="text-4xl lg:text-6xl">and</p>
              <p>Jonalyn</p>
            </div>
          </div>
          {/* Parallax Slides - Top - Position:Relative */}
          <div
            className="absolute top-[5%] -z-10 h-full w-full overflow-clip lg:overflow-visible"
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
          </div>
          {/* Flower Stem */}
          <div className="absolute -z-10 h-full w-full overflow-clip lg:overflow-visible">
            <div
              ref={transition}
              className="absolute bottom-[30%] left-[40%] z-30 h-1/2 w-1/2 scale-150"
              style={{
                backgroundImage: `url(${flowerStem})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Flower - Individual */}
              <div className="relative size-full">
                <div className="absolute bottom-[35%] h-[25%] w-full">
                  <div
                    ref={flower1Position}
                    className="absolute left-[20%] top-[10%] size-1/4 scale-125"
                    style={{
                      backgroundImage: `url("${flower1}")`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div
                    ref={flower2Position}
                    className="absolute top-[50%] aspect-square size-1/4 scale-[2.5]"
                    style={{
                      backgroundImage: `url("${flower2}")`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div
                    ref={flower3Position}
                    className="absolute bottom-[25%] right-0 aspect-square size-1/4 scale-[2]"
                    style={{
                      backgroundImage: `url("${flower3}")`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              ref={transitionBottom}
              className="absolute bottom-[5%] z-20 flex h-[15%] w-full gap-2 sm:h-[13%] sm:gap-0 lg:bottom-[2%] lg:h-[19%] lg:gap-10"
            >
              <div
                ref={photo1}
                className="relative right-[50%] size-full basis-1/2 rotate-[-2deg] sm:right-[52%]"
              >
                <div
                  className="size-full"
                  style={{
                    backgroundImage: `url(${heroPhoto1})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
              <div
                ref={photo2}
                className="relative left-[50%] size-full basis-1/2 rotate-[2deg] sm:left-[52%]"
              >
                <div
                  className="size-full"
                  style={{
                    backgroundImage: `url(${heroPhoto2})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
          </div>
          {/* Spacer */}
          <div className="h-[50vh]"></div>
          {/* HeroDate */}
          {/*Date*/}
          <div
            ref={imageDate}
            className="relative top-[6%] -z-10 h-1/4 w-[80%] lg:h-[25%] lg:w-[70%]"
          >
            <ParallaxImage image={heroPageDate} date={date} />
          </div>
          <div
            ref={dateContainer}
            className="absolute bottom-1/4 h-1/4 w-full sm:h-[15%]"
          ></div>
        </div>
      </div>
      {/* FRAME */}
      <div className="absolute top-0 -z-50 size-full">
        {/* First Left frame */}
        <div className="absolute -top-1/4 right-[50%] flex size-full scale-50 flex-col bg-lime-500/0 max-lg:right-[52%] max-md:right-[50%] max-sm:right-[53%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,-1)",
            }}
          ></div>
        </div>
        {/* Second Left frame  */}
        <div className="absolute right-[50%] top-1/4 flex size-full scale-50 flex-col bg-blue-500/0 max-lg:right-[52%] max-md:right-[50%] max-sm:right-[53%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,-1)",
            }}
          ></div>
        </div>

        {/* First Right frame */}
        <div className="absolute -top-1/4 left-[50%] flex size-full scale-50 flex-col max-lg:left-[52%] max-md:left-[50%] max-sm:left-[53%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,-1)",
            }}
          ></div>
        </div>
        {/* Second Right frame */}
        <div className="absolute left-[50%] top-1/4 flex size-full scale-50 flex-col max-lg:left-[52%] max-md:left-[50%] max-sm:left-[53%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,-1)",
            }}
          ></div>
        </div>

        {/* First Left Frame */}
        {/* <div
          className="absolute -top-[7%] right-[45%] h-full w-[150%] border-2 border-solid border-green-500/0 bg-emerald-500/0 max-2xl:-top-[15%] max-2xl:scale-75 max-lg:right-[40%]"
          style={{
            backgroundImage: `url("${frame}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "scale(-.75,.75)",
          }}
        ></div> */}
        {/* First Right Frame */}
        {/* <div
          className="absolute -top-[7%] left-[45%] h-full w-[150%] border-2 border-solid border-orange-500/0 bg-orange-500/0 max-2xl:-top-[15%] max-2xl:scale-75 max-lg:left-[40%]"
          // className="absolute -top-[7%] left-[45%] size-full border-2 border-solid border-orange-500 bg-orange-500/0"
          style={{
            backgroundImage: `url("${frame}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "scale(.75)",
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default HeroPage;

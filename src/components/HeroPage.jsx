import { useLayoutEffect, useRef, useEffect, useContext } from "react";
import Image from "../constants/Image";
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
} = Image;

const ParallaxImage = ({ image, date }) => {
  return (
    <div className="relative mx-auto flex size-full flex-col items-center justify-center bg-white font-Showtime">
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
            className="absolute top-0 z-20 size-full"
            style={{
              backgroundImage: `url("${heroPageMask}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span
            ref={date}
            className="absolute left-[48%] top-[70%] z-10 h-fit w-full min-w-fit -translate-x-[50%] text-center text-5xl text-white sm:top-[65%] sm:text-7xl lg:left-[50%] lg:top-[80%] lg:text-8xl"
          >
            Save the Date
          </span>
        </div>
        <div className="relative right-1 flex basis-[10%] flex-col items-center gap-2 text-center text-5xl lg:text-6xl">
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
  const heroPageContainer = useRef(null);
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
  // Hero Title container
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: heroPageContainer.current,
            start: "0% 25%",
            end: "75% 75%",
            scrub: true,
          },
        })
        .to(titleContainer.current, {
          y: 450,
          opacity: 0,
          ease: "power4.inOut",
        });
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
            start: `${width < 640 ? "-50% 0%" : "-30% 10%"}`,
            end: `${width < 640 ? "150% 70%" : "125% 90%"}`,
            scrub: true,
          },
        })
        .to(title.current, {
          y: `${width < 640 ? window.innerHeight / 4.5 : width > 1024 ? window.innerHeight / 5 : window.innerHeight / 3.7}%`,
          ease: "circ.inOut",
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
            start: `${width < 640 ? "25% 65%" : "-125% 35%"}`,
            end: `${width < 640 ? "55% 35%" : "25% 25%"}`,
            scrub: true,
          },
        })
        .to(
          date.current,
          {
            y: `-${width < 640 ? window.innerHeight / 2 : window.innerHeight / 2.3}%`,
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
        .to(
          photo1.current,
          {
            x: `${width > 1023 ? "150%" : "110%"}`,
            ease: "expo.inOut",
            y: "15%",
          },
          0,
        )
        .to(
          photo2.current,
          {
            x: `${width > 1023 ? "-150%" : "-110%"}`,
            ease: "expo.inOut",
            y: "15%",
          },
          0,
        );
    });
    return () => context.revert();
  }, []);

  return (
    // Main page
    <div
      ref={heroPageContainer}
      className="relative flex justify-center overflow-clip"
    >
      <div className="relative flex h-[250lvh] w-full max-w-[1024px] justify-center sm:h-[350lvh] lg:overflow-visible">
        {/* Inner Wrapper */}
        <div
          ref={container}
          className="relative flex size-full flex-col items-center"
        >
          {/* TitleContainer */}
          <div
            ref={titleContainer}
            className="relative top-[10%] flex h-1/4 w-full flex-col items-center gap-2"
          >
            <div
              ref={heroImage}
              className="relative top-[0%] z-20 size-full"
              style={{
                backgroundImage: `url(${heroPageMain})`,
                backgroundSize: "contain",
                backgroundPosition: "right 46% bottom 50%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              ref={heroMask}
              className="absolute top-[0%] z-40 size-full"
              style={{
                backgroundImage: `url(${heroPageMainMask})`,
                backgroundSize: "contain",
                backgroundPosition: "right 46% bottom 50%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            {/* Jeffrey and Jonalyn */}
            <div
              ref={title}
              className="text-jeff-jona absolute -top-[25%] right-[50%] z-30 flex size-fit translate-x-[48%] flex-col text-center font-Showtime text-white"
            >
              <p className="text-motif">Jeffrey</p>
              <p className="text-4xl text-motif lg:text-6xl">and</p>
              <p className="text-motif">Jonalyn</p>
            </div>
          </div>
          {/* Parallax Slides - Top - Position:Relative */}
          <div
            className="absolute top-[5%] -z-10 mx-auto h-full w-full overflow-clip lg:overflow-visible"
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
          <div className="absolute -z-10 flex h-full w-full justify-center overflow-clip lg:overflow-visible">
            <div
              ref={transitionBottom}
              className="absolute bottom-[10%] z-20 mx-auto flex h-[20%] w-full gap-2 sm:h-[17%] sm:gap-0 md:h-[19%] lg:gap-10"
            >
              <div
                ref={photo1}
                className="size-90% relative right-[50%] flex basis-1/2 rotate-[-2deg] items-center justify-center bg-white sm:right-[52%] lg:right-[70%]"
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${heroPhoto1})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
              <div
                ref={photo2}
                className="size-90% relative left-[50%] flex basis-1/2 rotate-[2deg] items-center justify-center bg-white sm:left-[52%] lg:left-[70%]"
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${heroPhoto2})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* Spacer */}
          <div className="mx-auto h-[75vh]"></div>
          {/* HeroDate */}
          {/*Date*/}
          <div
            ref={imageDate}
            className="relative top-[6%] -z-10 mx-auto h-1/4 w-[80%] lg:h-[25%] lg:w-[70%]"
          >
            <ParallaxImage image={heroPageDate} date={date} />
          </div>
          <div
            ref={dateContainer}
            className="absolute bottom-1/4 mx-auto h-1/4 w-full sm:h-[15%]"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;

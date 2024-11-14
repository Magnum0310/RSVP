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
  flower1,
  flower2,
  flower3,
  weddingRings,
} = Image;

const ParallaxImage = ({ image, date }) => {
  return (
    <div className="relative mx-auto flex h-[90%] w-[75%] flex-col items-center justify-center bg-white font-Showtime max-sm:size-full">
      <div className="relative flex size-[90%] flex-col items-center gap-2">
        <div
          className="relative w-full basis-[85%]"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            // backgroundPosition: "50% 95%",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute top-0 z-20 size-full"
            style={{
              backgroundImage: `url("${heroPageMask}")`,
              backgroundSize: "cover",
              // backgroundPosition: "50% 95%",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <span
            ref={date}
            className="absolute left-[50%] top-[90%] z-10 h-fit w-[95vw] min-w-fit -translate-x-[50%] text-center text-white max-sm:text-4xl sm:top-[75%] sm:w-[85%] sm:text-center sm:text-6xl lg:left-[50%] lg:top-[75%]"
          >
            <p className="text-left max-sm:hidden">Save</p>
            <p className="text-center max-sm:hidden">the</p>
            <p className="text-right max-sm:hidden">Date</p>
            <p className="sm:hidden">Save the Date</p>
          </span>
        </div>
        <div className="relative top-5 flex w-full basis-[10%] flex-col items-center gap-2 text-center text-5xl max-sm:top-2 max-sm:text-4xl lg:text-5xl">
          <span className="w-full">
            <p className="">12-16-24</p>
            <p className="">Baguio City</p>
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
  const weddingRingsRef = useRef(null);
  const floral1Ref = useRef(null);
  const floral2Ref = useRef(null);
  const floral3Ref = useRef(null);

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
        .to(imageDate.current, { rotate: "1deg", y: -450 }, 0)
        .to(weddingRingsRef.current, { left: "40%", y: -350 }, 0);
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
          y: 350,
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
          y: `${width < 420 ? window.innerHeight / 4 : width < 640 ? window.innerHeight / 4.2 : width > 1024 ? window.innerHeight / 5 : window.innerHeight / 3.7}%`,
          ease: "circ.inOut",
          opacity: 0,
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
            y: `-${width < 640 ? window.innerHeight / 1.4 : window.innerHeight / 5}%`,
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
            opacity: 1,
          },
          0,
        )
        .to(
          photo2.current,
          {
            x: `${width > 1023 ? "-150%" : "-110%"}`,
            ease: "expo.inOut",
            y: "15%",
            opacity: 1,
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
            className="relative top-[5%] flex h-[30%] w-full flex-col items-center gap-2 xl:top-[2%] xl:h-[40%]"
          >
            <div
              ref={heroImage}
              className="relative top-[0%] z-20 size-full"
              style={{
                backgroundImage: `url(${heroPageMain})`,
                backgroundSize: "contain",
                // backgroundPosition: "right 46% bottom 50%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              ref={heroMask}
              className="absolute top-[0%] z-40 size-full"
              style={{
                backgroundImage: `url(${heroPageMainMask})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="absolute right-[50%] top-1/4 -z-10 size-[55%] opacity-25"
              style={{
                backgroundImage: `url(${flower2})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="absolute left-[50%] top-1/4 -z-10 size-[55%] opacity-25"
              style={{
                backgroundImage: `url(${flower3})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              ref={floral1Ref}
              className="absolute right-1/2 top-[50%] -z-10 size-3/4 translate-x-1/2 opacity-25 max-sm:top-[60%]"
              style={{
                backgroundImage: `url(${flower1})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            {/* Jeffrey and Jonalyn */}
            <div
              ref={title}
              className="text-jeff-jona absolute right-[50%] top-[5%] z-30 flex size-fit w-full translate-x-[50%] flex-col text-center font-GreatVibes text-black"
            >
              <p className="bg-gradient-to-b from-motif from-35% via-black/85 via-50% to-black to-55% bg-clip-text py-3 text-transparent">
                Jeffrey
              </p>
              <p className="bg-gradient-to-b from-motif from-35% via-black/85 via-50% to-black to-55% bg-clip-text text-4xl text-transparent lg:text-6xl">
                and
              </p>
              <p className="bg-gradient-to-b from-motif from-35% via-black/85 via-50% to-black to-55% bg-clip-text py-3 text-transparent">
                Jonalyn
              </p>
            </div>
          </div>
          {/* Parallax Slides - Top - Position:Relative */}
          <div
            className="absolute top-[5%] -z-10 mx-auto h-full w-full lg:overflow-visible"
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
                className="size-90% relative right-[50%] flex basis-1/2 rotate-[-2deg] items-center justify-center bg-white opacity-0 sm:right-[52%] lg:right-[70%]"
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
                className="size-90% relative left-[50%] flex basis-1/2 rotate-[2deg] items-center justify-center bg-white opacity-0 sm:left-[52%] lg:left-[70%]"
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
            className="relative top-[6%] z-10 mx-auto h-1/4 w-[80%] lg:h-[25%] lg:w-[70%]"
          >
            <ParallaxImage image={heroPageDate} date={date} />
            <div
              ref={weddingRingsRef}
              className="absolute top-[30%] -z-10 h-[40%] w-[95%] rotate-[30deg] opacity-25"
            >
              <div
                className="relative left-[0%] size-full sm:-top-[35%]"
                style={{
                  backgroundImage: `url("${weddingRings}")`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  scale: "1",
                }}
              ></div>
            </div>
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

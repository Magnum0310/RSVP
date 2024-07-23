import { useRef, useLayoutEffect } from "react";
import Images from "../constants/Image";
import Card from "./LocationCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const {
  feather1,
  feather2,
  feather3,
  leaf2,
  receptionMap,
  locationAccent,
  church1,
  church2,
  church3,
  reception1,
  reception2,
  reception3,
} = Images;

const Leaf = ({ track, leaf, flip, rotate, className }) => {
  return (
    <div
      ref={track}
      className={"" + className + ""}
      style={{
        backgroundImage: `url("${leaf}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        rotate: `${rotate ? "" + rotate + "" : "0deg"}`,
      }}
    ></div>
  );
};

const churchLocation = () => {
  const accent1 = useRef(null);
  const accent2 = useRef(null);
  const title = useRef(null);
  const container = useRef(null);
  const background = useRef(null);
  const map = useRef(null);
  const pic1 = useRef(null);
  const pic2 = useRef(null);
  const pic3 = useRef(null);
  const leafBg1 = useRef(null);
  const leafBg2 = useRef(null);
  const leafBg3 = useRef(null);
  const leafBg4 = useRef(null);
  const leafBg5 = useRef(null);

  // Pictures
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom end",
            scrub: true,
          },
        })
        .to(map.current, { rotate: "7deg", y: -250 }, 0)
        .to(pic1.current, { rotate: "-3deg", y: -370 }, 0)
        .to(pic2.current, { rotate: "5deg", y: -350 }, 0)
        .to(pic3.current, { rotate: "-3deg", y: -250 }, 0);
    });
    return () => context.revert();
  }, []);
  // Background - Feathers
  useLayoutEffect(() => {
    const context1 = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: background.current,
            start: "top center",
            end: "bottom end",
            scrub: true,
          },
        })
        .to(leafBg1.current, { rotate: "-200deg", x: 100, y: -350 }, 0)
        .to(leafBg2.current, { rotate: "150deg", y: -275 }, 0)
        .to(leafBg3.current, { rotate: "10deg", x: -50, y: -250 }, 0)
        .to(leafBg4.current, { rotate: "-20deg", x: -50, y: -350 }, 0)
        .to(leafBg5.current, { y: 100 }, 0);
    });
    return () => context1.revert();
  }, []);
  // Title
  useLayoutEffect(() => {
    const context1 = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: title.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(accent1.current, { rotate: "65deg" }, 0)
        .to(accent2.current, { rotate: "115deg" }, 0);
    });
    return () => context1.revert();
  }, []);

  return (
    <div
      ref={container}
      className="relative flex flex-col items-center overflow-hidden"
    >
      {/* Page Title - Church Location */}
      <div
        ref={title}
        className="relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl"
      >
        Wedding Reception
      </div>
      {/* Page Content - Church Pictures */}
      <div className="relative z-10 flex h-[150vh] w-full flex-col items-center justify-center">
        <div ref={map} className="absolute top-[15%] h-[35%] w-3/4">
          <Card
            image={receptionMap}
            title={"Wedding Reception"}
            address={"Complete Address"}
            link={
              "https://www.google.com.hk/maps/place/SM+Megamall+Building+A/@14.5859462,121.0539649,17z/data=!3m1!4b1!4m6!3m5!1s0x3397c9bdea6be067:0xb72b90b4df1825fd!8m2!3d14.5859462!4d121.0565345!16zL20vMDZqaGh0?entry=ttu"
            }
          />
        </div>
        <div
          ref={pic1}
          className="absolute left-[5%] top-[60%] h-[20%] w-[45%]"
        >
          <Card image={reception1} />
        </div>
        <div
          ref={pic2}
          className="absolute right-[1%] top-[65%] h-[30%] w-[55%]"
        >
          <Card image={reception2} />
        </div>
        <div
          ref={pic3}
          className="absolute left-[10%] top-[70%] h-[25%] w-[50%]"
        >
          <Card image={reception3} />
        </div>
      </div>
      {/* Background Images */}
      <div ref={background} className="absolute top-0 size-full">
        {/* Leaf 1 */}
        <Leaf
          track={leafBg1}
          leaf={feather2}
          rotate={"15deg"}
          className={
            "absolute left-[14%] top-[55%] h-[35%] w-full scale-x-[-1]"
          }
        />
        {/* Leaf 2 */}
        <Leaf
          track={leafBg2}
          leaf={feather3}
          rotate={"180deg"}
          className={"absolute left-[28%] top-[60%] h-[40%] w-full"}
        />
        {/* Leaf 3 */}
        <Leaf
          track={leafBg3}
          leaf={feather2}
          rotate={"160deg"}
          className={
            "absolute right-[35%] top-[75%] h-[30%] w-full scale-x-[-1]"
          }
        />
        {/* Leaf 4 */}
        <Leaf
          track={leafBg4}
          leaf={feather2}
          rotate={"-25deg"}
          className={"absolute right-[40%] top-[53%] h-[35%] w-full"}
        />
      </div>
      {/* Leaf 5 */}
      <Leaf
        track={leafBg5}
        leaf={feather2}
        rotate={"175deg"}
        className={"absolute right-[5%] top-[45%] h-[38%] w-full"}
      />
      {/* Accents */}
      <div
        ref={accent1}
        className="absolute -left-[5%] top-0 h-[10%] w-1/4 rotate-[80deg]"
        style={{
          backgroundImage: `url("${locationAccent}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div
        ref={accent2}
        className="absolute -right-[5%] top-0 h-[10%] w-1/4 -rotate-[80deg] scale-x-[-1]"
        style={{
          backgroundImage: `url("${locationAccent}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default churchLocation;

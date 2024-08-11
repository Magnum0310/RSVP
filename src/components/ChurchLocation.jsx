import { useRef, useLayoutEffect } from "react";
import Images from "../constants/Image";
import Card from "../components/LocationCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { leaf1, leaf2, churchMap, locationAccent, church1, church2, church3 } =
  Images;

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
        .to(map.current, { rotate: "-7deg", y: -250 }, 0)
        .to(pic1.current, { rotate: "-3deg", y: -370 }, 0)
        .to(pic2.current, { rotate: "5deg", y: -350 }, 0)
        .to(pic3.current, { rotate: "-3deg", y: -250 }, 0);
    });
    return () => context.revert();
  }, []);
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
        .to(leafBg1.current, { x: -150, y: -750 }, 0)
        .to(leafBg2.current, { x: -10, y: -450 }, 0)
        .to(leafBg3.current, { x: 150, y: -350 }, 0)
        .to(leafBg4.current, { x: 150, y: 50 }, 0)
        .to(leafBg5.current, { y: -250 }, 0);
    });
    return () => context1.revert();
  }, []);
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
        Church Location
      </div>
      {/* Page Content - Church Pictures */}
      <div className="relative z-10 flex h-[150vh] w-full flex-col items-center justify-center">
        <div
          ref={map}
          className="border-draft absolute top-[15%] h-[35%] w-3/4 sm:w-[60%]"
        >
          <Card
            image={churchMap}
            title={"Holy Catholic Church"}
            address={"Complete Address"}
            link={
              "https://www.google.com.hk/maps/place/LifeCity+Church/@14.5724288,121.0582199,17z/data=!3m1!4b1!4m6!3m5!1s0x3397c90b0715e4a7:0x1eea62a07e2500f7!8m2!3d14.5724288!4d121.0607948!16s%2Fg%2F1pzs12k0_?entry=ttu"
            }
          />
        </div>
        <div
          ref={pic1}
          className="absolute left-[5%] top-[60%] h-[30%] w-[55%] sm:w-[50%]"
        >
          <Card image={church1} />
        </div>
        <div
          ref={pic2}
          className="absolute right-[1%] top-[65%] h-[20%] w-[45%] sm:w-[40%]"
        >
          <Card image={church2} />
        </div>
        <div
          ref={pic3}
          className="absolute right-[20%] top-[75%] h-[25%] w-[50%] sm:w-[45%]"
        >
          <Card image={church3} />
        </div>
      </div>
      {/* Background Images */}
      <div ref={background} className="absolute top-0 size-full">
        <Leaf
          track={leafBg1}
          leaf={leaf1}
          rotate={"220deg"}
          className={
            "absolute right-[20%] top-[85%] h-[35%] w-full scale-x-[-1]"
          }
        />
        <Leaf
          track={leafBg2}
          leaf={leaf2}
          rotate={"230deg"}
          className={
            "absolute right-[25%] top-[100%] h-[5%] w-full scale-x-[-1]"
          }
        />
        <Leaf
          track={leafBg2}
          leaf={leaf2}
          rotate={"230deg"}
          className={
            "absolute right-[25%] top-[100%] h-[5%] w-full scale-x-[-1]"
          }
        />
        <Leaf
          track={leafBg5}
          leaf={leaf2}
          rotate={"175deg"}
          className={
            "absolute right-[15%] top-[95%] h-[10%] w-full scale-x-[-1]"
          }
        />
        <Leaf
          track={leafBg3}
          leaf={leaf1}
          rotate={"0deg"}
          className={
            "absolute left-[10%] top-[53%] h-[25%] w-full scale-x-[-1]"
          }
        />
        <Leaf
          track={leafBg4}
          leaf={leaf1}
          rotate={"190deg"}
          className={"absolute left-[10%] top-[55%] h-[30%] w-full"}
        />

        {/*  */}
        <div className="absolute left-[55%] top-[75%] hidden h-[50%] w-full">
          <Leaf leaf={leaf1} flip={true} />
        </div>
        <div className="absolute left-[30%] top-[75%] hidden h-[80%] w-full">
          <Leaf leaf={leaf1} rotate={"-45deg"} />
        </div>
        <div className="absolute left-[30%] top-[90%] hidden h-[25%] w-full">
          <Leaf leaf={leaf1} rotate={"135deg"} />
        </div>
        <div className="absolute left-1/4 top-[50%] hidden h-[45%] w-[150%]">
          <Leaf leaf={leaf1} rotate={"-30deg"} />
        </div>
        <div className="absolute left-1/4 top-[75%] hidden h-[20%] w-full">
          <Leaf leaf={leaf1} rotate={"165deg"} />
        </div>
      </div>
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

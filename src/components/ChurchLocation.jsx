import { useRef, useLayoutEffect } from "react";
import Images from "../constants/Image";
import Card from "../components/LocationCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { leaf1, leaf2, churchMap, locationAccent, church1, church2, church3 } =
  Images;

const Leaf = ({ leaf, flip }) => {
  return (
    <div
      className={`size-1/2 ${flip && "scale-x-[-1]"}`}
      style={{
        backgroundImage: `url(${leaf})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

const churchLocation = () => {
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
        .to(leafBg1.current, { rotate: "-3deg", y: -750 }, 0);
      // .to(leafBg2.current, { rotate: "-3deg", y: -250 }, 0)
      // .to(leafBg3.current, { rotate: "-3deg", y: -250 }, 0)
      // .to(leafBg4.current, { rotate: "-3deg", y: -250 }, 0)
      // .to(leafBg5.current, { rotate: "-3deg", y: -250 }, 0);
    });
    return () => context1.revert();
  }, []);

  return (
    <div
      ref={container}
      className="relative flex flex-col items-center overflow-hidden"
    >
      {/* Page Title - Church Location */}
      <div className="relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl">
        Church Location
      </div>
      {/* Page Content - Church Pictures */}
      <div className="relative flex h-[150vh] w-full flex-col items-center justify-center">
        <div ref={map} className="absolute top-[15%] h-[35%] w-3/4">
          <Card
            image={churchMap}
            title={"Holy Catholic Church"}
            address={"Complete Address"}
            link={"https://google.com"}
          />
        </div>
        <div
          ref={pic1}
          className="absolute left-[5%] top-[60%] h-[30%] w-[55%]"
        >
          <Card image={church1} />
        </div>
        <div
          ref={pic2}
          className="absolute right-[1%] top-[65%] h-[20%] w-[45%]"
        >
          <Card image={church2} />
        </div>
        <div
          ref={pic3}
          className="absolute right-[20%] top-[75%] h-[25%] w-[50%]"
        >
          <Card image={church3} />
        </div>
      </div>
      {/* Background Images */}
      <div ref={background} className="absolute top-0 z-20 size-full">
        <div
          ref={leafBg1}
          className="absolute left-[35%] top-[75%] h-[50%] w-full"
        >
          <Leaf leaf={leaf1} flip={true} />
        </div>
        <div className="absolute top-1/2 hidden h-[60%] w-full">
          <Leaf leaf={leaf1} />
        </div>
        <div className="absolute top-1/2 hidden h-[75%] w-full">
          <Leaf leaf={leaf1} />
        </div>
        <div className="absolute top-1/2 hidden h-[35%] w-full">
          <Leaf leaf={leaf1} />
        </div>
        <div className="absolute top-1/2 hidden h-[20%] w-full">
          <Leaf leaf={leaf1} />
        </div>
      </div>
    </div>
  );
};

export default churchLocation;

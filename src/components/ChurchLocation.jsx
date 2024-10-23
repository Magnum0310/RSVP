import { useRef, useLayoutEffect } from "react";
import Images from "../constants/Image";
import Card from "../components/LocationCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Frame from "./Frame";
import { useContext } from "react";
import Image from "../constants/Image";
import UserformContext from "@/context/UserformContext";

gsap.registerPlugin(ScrollTrigger);

const {
  leaf1,
  leaf2,
  churchMap,
  locationAccent,
  church1,
  church2,
  church3,
  churchFacade,
  churchIsle,
  churchAltar,
  ourLadyOfLourdes,
} = Images;
const { frame } = Image;

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
  const { width } = useContext(UserformContext);

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
        .to(map.current, { rotate: "-7deg", y: -200 }, 0)
        .to(pic1.current, { rotate: "-3deg", y: -370 }, 0)
        .to(pic2.current, { rotate: "5deg", y: -350 }, 0)
        .to(pic3.current, { rotate: "-3deg", y: -200 }, 0);
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
        .to(leafBg5.current, { y: -200 }, 0);
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
    <div className="relative">
      <div
        ref={container}
        className="flex flex-col items-center overflow-hidden"
      >
        <div className="flex size-full max-w-[1024px] flex-col items-center sm:py-12">
          {/* Page Title - Church Location */}
          <div
            ref={title}
            className="text-pageTitle relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac"
          >
            Church Location
          </div>
          {/* Page Content - Church Pictures */}
          <div className="relative z-10 flex h-[150vh] w-full flex-col items-center justify-center">
            <div
              ref={map}
              className={`absolute top-[15%] z-10 h-[35%] ${width < 500 ? "w-[70%]" : "w-[65%]"} sm:w-[55%] md:h-[40%] md:w-[45%] lg:w-[40%]`}
            >
              <Card
                image={ourLadyOfLourdes}
                title={"Church of Our Lady of Lourdes"}
                address={"Kisad Rd, Baguio, Benguet"}
                link={
                  "https://www.google.com/maps/place/Church+of+Our+Lady+of+Lourdes/@16.4095701,120.5925648,18.79z/data=!4m6!3m5!1s0x3391a1693d1b683b:0xe18011c51140cfac!8m2!3d16.409745!4d120.592533!16s%2Fg%2F1tdc2rgx?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D"
                }
              />
            </div>
            <div
              ref={pic1}
              className={`absolute left-[5%] top-[65%] ${width < 500 ? "h-[23%] w-[45%]" : "h-[25%] w-[45%]"} sm:left-[8%] sm:top-[60%] sm:h-[30%] sm:w-[40%] md:top-[70%] md:h-[30%] md:w-[35%] lg:left-[12%] lg:top-[65%] lg:h-[35%]`}
            >
              {/* <div
              ref={pic1}
              className="absolute left-[5%] top-[55%] h-[30%] w-[55%] sm:w-[50%] lg:left-[10%] lg:top-[65%] lg:h-[35%] lg:w-[27%]"
            > */}
              <Card image={churchFacade} />
            </div>
            <div
              ref={pic2}
              className={`absolute right-[1%] top-[75%] ${width < 500 ? "h-[30%] w-[55%]" : "h-[30%] w-[50%]"} sm:right-[3%] sm:w-[45%] md:right-[7%] md:top-[75%] md:h-[35%] md:w-[40%] lg:right-[10%] lg:top-[70%] lg:w-[35%]`}
            >
              {/* <div
              ref={pic2}
              className="lg: absolute right-[1%] top-[65%] h-[20%] w-[45%] sm:w-[27%] lg:right-[10%] lg:h-[30%] lg:w-[35%]"
            > */}
              <Card image={churchIsle} />
            </div>
            <div
              ref={pic3}
              className={`absolute right-[35%] top-[80%] h-[25%] w-[50%] ${width < 500 ? "h-[30%] w-[55%]" : "h-[30%] w-[45%]"} sm:top-[75%] sm:w-[40%] md:top-[80%] md:h-[35%] lg:top-[80%] lg:h-[35%] lg:w-[35%]`}
            >
              {/* <div
              ref={pic3}
              className="absolute right-[20%] top-[75%] h-[25%] w-[50%] sm:w-[45%] lg:h-[35%] lg:w-[27%]"
            > */}
              <Card image={churchAltar} />
            </div>
          </div>
          {/* Background Images */}
          <div ref={background} className="absolute top-0 size-full">
            <Leaf
              track={leafBg1}
              leaf={leaf1}
              rotate={"240deg"}
              className={
                "absolute right-[20%] top-[85%] h-[35%] w-full scale-x-[-1]"
              }
            />
            {/* <Leaf
              track={leafBg2}
              leaf={leaf2}
              rotate={"240deg"}
              className={
                "absolute right-[25%] top-[77%] h-[5%] w-full scale-x-[-1] bg-blue-500"
              }
            /> */}
            <Leaf
              track={leafBg2}
              leaf={leaf2}
              rotate={"240deg"}
              className={
                "absolute right-[25%] top-[100%] h-[5%] w-full scale-x-[-1]"
              }
            />
            <Leaf
              track={leafBg5}
              leaf={leaf2}
              rotate={"175deg"}
              className={
                "absolute right-[15%] top-[95%] h-[10%] w-full scale-x-[-1] lg:right-[12%]"
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
              className={
                "bg-blue6000 absolute left-[10%] top-[55%] h-[30%] w-full sm:w-[120%] lg:left-[15%]"
              }
            />
            <div className="bg-blue6000 absolute left-[55%] top-[75%] hidden h-[50%] w-full sm:w-[120%]">
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
            className="absolute -left-[5%] top-0 h-[10%] w-1/4 rotate-[80deg] sm:top-[2%]"
            style={{
              backgroundImage: `url("${locationAccent}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={accent2}
            className="absolute -right-[5%] top-0 h-[10%] w-1/4 -rotate-[80deg] scale-x-[-1] sm:top-[2%]"
            style={{
              backgroundImage: `url("${locationAccent}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>

      {/* ===============FRAME=============== */}

      <div className="hidden">
        <div className="absolute top-0 -z-50 h-[450vh] w-full">
          {/* First Left frame */}
          <div className="absolute -top-1/4 right-[50%] flex size-full scale-50 flex-col bg-blue-500 max-lg:right-[53%] max-sm:right-[27%] max-sm:h-full max-sm:w-[240%] sm:right-[35%] sm:w-[170%] sm:scale-[.35]">
            {/* <div className="absolute -top-1/4 right-[50%] flex size-full scale-50 flex-col bg-blue-500 max-lg:right-[53%] max-sm:right-[27%] max-sm:h-full max-sm:w-[240%] sm:right-[60%] sm:w-[120%]"> */}
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
          <div className="absolute right-[50%] top-1/4 flex size-full scale-50 flex-col max-lg:right-[53%] max-sm:right-[27%] max-sm:h-full max-sm:w-[240%] sm:right-[60%] sm:w-[120%]">
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
          {/* Third Left frame */}
          <div className="absolute right-[50%] top-3/4 flex size-full scale-50 flex-col max-lg:right-[53%] max-sm:right-[27%] max-sm:h-full max-sm:w-[240%] sm:right-[60%] sm:w-[120%]">
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
          <div className="absolute -top-1/4 left-[50%] flex size-full scale-50 flex-col max-lg:left-[53%] max-sm:left-[27%] max-sm:h-full max-sm:w-[240%] sm:left-[60%] sm:w-[120%]">
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
          <div className="absolute left-[50%] top-1/4 flex size-full scale-50 flex-col max-lg:left-[53%] max-sm:left-[27%] max-sm:h-full max-sm:w-[240%] sm:left-[60%] sm:w-[120%]">
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
          {/* Third Right frame */}
          <div className="absolute left-[50%] top-3/4 flex size-full scale-50 flex-col max-lg:left-[53%] max-sm:left-[27%] max-sm:h-full max-sm:w-[240%] sm:left-[60%] sm:w-[120%]">
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
        </div>
      </div>
    </div>
  );
};

export default churchLocation;

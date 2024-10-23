import { useRef, useLayoutEffect } from "react";
import Images from "../constants/Image";
import Card from "./LocationCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Frame from "./Frame";
import { useContext } from "react";
import Image from "../constants/Image";
import UserformContext from "@/context/UserformContext";

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
  ionHotelFacade,
  ionHotelLobby,
  ionHotelEventHall,
  ionHotelLocation,
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
    <div className="relative opacity-100">
      <div
        ref={container}
        className="relative flex flex-col items-center overflow-hidden"
      >
        <div className="relative flex size-full max-w-[1024px] flex-col items-center md:py-12">
          {/* Page Title - Church Location */}
          <div
            ref={title}
            className="text-pageTitle relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac"
          >
            Wedding Reception
          </div>
          {/* Page Content - Church Pictures */}
          <div className="relative z-10 flex h-[150vh] w-full flex-col items-center justify-center">
            <div
              ref={map}
              className={`absolute top-[15%] z-10 h-[35%] ${width < 500 ? "w-[70%]" : "w-[65%]"} sm:w-[55%] md:h-[40%] lg:w-[40%]`}
            >
              <Card
                image={ionHotelLocation}
                title={"Ion Hotel"}
                address={"56 Legarda Rd, Baguio, Benguet"}
                link={
                  "https://www.google.com/maps/place/Ion+Hotel/@16.4065608,120.5899767,17z/data=!3m1!4b1!4m9!3m8!1s0x3391a191cdabdebd:0xa2df8eaf46bc11e6!5m2!4m1!1i2!8m2!3d16.4065557!4d120.5925516!16s%2Fg%2F11v637pk89?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D"
                }
              />
            </div>
            <div
              ref={pic1}
              className={`absolute left-[5%] top-[58%] ${width < 500 ? "h-[23%] w-[45%]" : "h-[25%] w-[45%]"} sm:left-[10%] sm:top-[60%] sm:h-[30%] sm:w-[40%] md:top-[65%] md:w-[35%] lg:left-[12%] lg:h-[35%]`}
            >
              <Card image={ionHotelLobby} />
            </div>
            <div
              ref={pic2}
              className={`absolute right-[1%] top-[65%] ${width < 500 ? "h-[30%] w-[55%]" : "h-[30%] w-[50%]"} sm:right-[7%] sm:top-[65%] sm:w-[45%] md:top-[75%] md:h-[35%] md:w-[40%] lg:right-[10%] lg:w-[35%]`}
            >
              <Card image={ionHotelFacade} />
            </div>
            <div
              ref={pic3}
              className={`absolute left-[7%] top-[75%] ${width < 500 ? "h-[30%] w-[55%]" : "h-[30%] w-[45%]"} sm:left-[25%] sm:w-[40%] md:top-[80%] md:h-[35%] lg:top-[85%] lg:w-[35%]`}
            >
              <Card image={ionHotelEventHall} />
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
              className={"absolute left-[38%] top-[60%] h-[40%] w-full"}
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
            className="absolute -left-[5%] top-0 h-[10%] w-1/4 rotate-[80deg] md:top-[2%]"
            style={{
              backgroundImage: `url("${locationAccent}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={accent2}
            className="absolute -right-[5%] top-0 h-[10%] w-1/4 -rotate-[80deg] scale-x-[-1] md:top-[2%]"
            style={{
              backgroundImage: `url("${locationAccent}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>

      <div className="hidden">
        {/* FRAME */}
        <div className="absolute top-0 -z-50 h-[300vh] w-full">
          {/* First Left frame */}
          <div className="absolute -top-1/4 right-[50%] flex size-full scale-50 flex-col bg-blue-500 max-lg:right-[52%] max-md:right-[50%] max-sm:right-[53%]">
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
          <div className="absolute right-[50%] top-1/4 flex size-full scale-50 flex-col bg-blue-500/0 bg-orange-500 max-lg:right-[52%] max-md:right-[50%] max-sm:right-[53%]">
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
          <div className="absolute -top-1/4 left-[50%] flex size-full scale-50 flex-col bg-lime-500 max-lg:left-[52%] max-md:left-[50%] max-sm:left-[53%]">
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
          <div className="absolute left-[50%] top-1/4 flex size-full scale-50 flex-col bg-red-500 max-lg:left-[52%] max-md:left-[50%] max-sm:left-[53%]">
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

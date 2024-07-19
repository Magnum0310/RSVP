import { useRef, useLayoutEffect } from "react";
import Image from "../constants/Image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import eventDetails from "../constants/details.json";
import Card from "../components/EntourageCard";

gsap.registerPlugin(ScrollTrigger);

const {
  details1,
  details2,
  details3,
  details4,
  detailsTransition,
  entourageDivider,
  detailsFrame,
} = Image;
const { dressCode, colors, soup, salad, mainCourses, pasta, dessert } =
  eventDetails;

const Details = () => {
  const container2 = useRef(null);
  const container22 = useRef(null);
  const transition = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const thirdImage = useRef(null);
  const fourthImage = useRef(null);
  const detailTransition = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container2.current,
            start: "top bottom",
            end: "bottom center",
            // end: "+=1%",
            scrub: true,
          },
        })
        .to(transition.current, { y: 350 }, 0)
        .to(firstImage.current, { rotate: -10, x: "75%" }, 0)
        .to(secondImage.current, { rotate: 10, x: "175%" }, 0)
        .to(detailTransition.current, { rotate: 30, x: 390 }, 0);
      // .to(firstImage.current, { rotate: -10, x: 160 }, 0)
      // .to(secondImage.current, { rotate: 10, x: 390 }, 0)
    });
    return () => context.revert();
  }, []);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container22.current,
            start: "top center",
            end: "75% center",
            // end: "+=1%",
            scrub: true,
          },
        })
        .to(thirdImage.current, { rotate: -10, x: "175%" }, 0)
        .to(fourthImage.current, { rotate: 10, x: "225%" }, 0);
      // .to(thirdImage.current, { rotate: -10, x: 390 }, 0)
      // .to(fourthImage.current, { rotate: 10, x: 500 }, 0);
    });
    return () => context.revert();
  }, []);

  console.log(colors);

  return (
    <div className="relative -top-32 h-[200vh]">
      <div ref={container22} className="h-1/2 overflow-hidden">
        <div
          ref={container2}
          className="relative top-1/2 flex h-1/2 w-full -translate-y-1/2 gap-5 text-center"
        >
          <div
            ref={firstImage}
            className="absolute -left-[50%] top-1/2 h-1/2 w-1/2 -translate-y-1/2 place-content-center"
            style={{
              backgroundImage: `url("${details1}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={secondImage}
            className="absolute -left-[75%] top-1/2 h-1/2 w-1/2 -translate-y-1/2 place-content-center"
            style={{
              backgroundImage: `url("${details2}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={thirdImage}
            className="absolute -left-[50%] top-1/2 h-1/2 w-1/2 -translate-y-1/2 place-content-center"
            style={{
              backgroundImage: `url("${details3}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={fourthImage}
            className="absolute -left-1/2 top-1/2 h-1/2 w-1/2 -translate-y-1/2 place-content-center"
            style={{
              backgroundImage: `url("${details4}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div
            ref={detailTransition}
            className="absolute -left-1/2 top-1/4 -z-10 h-1/2 w-1/2 place-content-center"
            style={{
              backgroundImage: `url("${detailsTransition}")`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              scale: "2.5",
            }}
          ></div>
        </div>
      </div>
      <div className="relative -top-[15%] flex h-fit flex-col items-center gap-3">
        <div className="relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac text-3xl">
          Details
        </div>
        {/* Dress Code */}
        <div className="flex h-fit w-[75%] min-w-[150px] flex-col items-center gap-3 text-center">
          <div className="text-center font-Coldiac text-2xl">Dress Code</div>
          {dressCode.map((item, index) => (
            <div key={index} className="font-Coldiac text-xs leading-5">
              {item}
            </div>
          ))}
        </div>
        {/* Colors */}
        <div className="flex h-[10%] w-[75%] justify-center gap-2 py-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="aspect-square size-[15%] rounded-full border-[1px] border-solid border-black"
              style={{
                background: `${"" + color + ""}`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>
        {/* The Menu */}
        <div
          className="w-[85%] bg-amber-500"
          style={{
            backgroundImage: `url("${detailsFrame}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative w-full">
            <div className="mt-3 flex h-fit min-w-[150px] flex-col items-center">
              <div className="text-center font-Coldiac text-2xl">The Menu</div>
            </div>
            <Card title={"Soup"} list={soup} />
            <Card title={"Salad"} list={salad} />
            <Card title={"Main Courses"} list={mainCourses} />
            <Card title={"Past"} list={pasta} />
            <Card title={"Dessert"} list={dessert} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

import { useRef, useLayoutEffect } from "react";
import Image from "../constants/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { entourage1, entourage2, entourage3, entourageCenter } = Image;

const Entourage = () => {
  const container1 = useRef(null);
  const imageCenter = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const image3 = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container1.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(imageCenter.current, { y: 500 }, 0)
        .to(image1.current, { y: -850 }, 0)
        .to(image2.current, { y: -650 }, 0)
        .to(image3.current, { y: -350 }, 0);
    });
    return () => context.revert();
  }, []);

  return (
    // Main Page
    <div className="h-[400vh]">
      {/* Inner Wrapper */}
      <div
        ref={container1}
        className="relative flex size-full justify-center bg-green-500"
      >
        {/* Entourage Images - Position:Absolute */}
        <div className="absolute h-1/2 w-full bg-red-500">
          <div
            ref={imageCenter}
            className="absolute top-0 h-[30%] w-full bg-green-500"
            style={{
              backgroundImage: `url(${entourageCenter})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              paddingLeft: "100px",
            }}
          ></div>
          <div
            ref={image1}
            className="absolute left-[5%] top-[30%] h-1/4 w-[20%]"
            style={{
              backgroundImage: `url(${entourage1})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              rotate: "-10deg",
            }}
          ></div>
          <div
            ref={image2}
            className="absolute left-1/2 top-[36%] h-[15%] w-[35%] -translate-x-1/2"
            style={{
              backgroundImage: `url(${entourage2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              rotate: "5deg",
            }}
          ></div>
          <div
            ref={image3}
            className="absolute right-[5%] top-[35%] h-[10%] w-[25%]"
            style={{
              backgroundImage: `url(${entourage3})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              rotate: "10deg",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Entourage;

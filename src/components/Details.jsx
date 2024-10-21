import {
  useRef,
  useLayoutEffect,
  forwardRef,
  useState,
  useContext,
} from "react";
import Image from "../constants/Image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import eventDetails from "../constants/details.json";
import Card from "../components/EntourageCard";
import Frame from "./Frame";
import UserformContext from "../context/UserformContext";
gsap.registerPlugin(ScrollTrigger);

const {
  details1,
  details2,
  details3,
  details4,
  detailsTransition,
  entourageDivider,
  detailsFrame,
  detailsDressCode,
  detailsDressCodeFrame,
} = Image;
const { dressCode, colors, soup, salad, mainCourses, pasta, dessert, gift } =
  eventDetails;

const DetailsImageTransition = ({ imageName, styleName, refName }) => {
  return (
    <div
      ref={refName}
      className={styleName}
      style={{
        backgroundImage: `url("${imageName}")`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};

const Details = () => {
  const container2 = useRef(null);
  const container22 = useRef(null);
  const containerDetails = useRef(null);
  const transition = useRef(null);
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  const thirdImage = useRef(null);
  const fourthImage = useRef(null);
  const detailTransition = useRef(null);
  const dressCodeList = useRef(null);
  const dressCodeList1 = useRef(null);
  const menuList = useRef(null);

  const { width } = useContext(UserformContext);

  const dressCode0 = dressCode[0].split(" ");
  const dressCode1 = dressCode[1].split(" ");
  const dressCode2 = dressCode[2].split(" ");

  // DETAIL IMAGE STYLE
  const detailStyleName =
    "h-full max-h-[85%] w-1/2 absolute top-1/2 -translate-y-1/2 place-content-center";
  const detailsImagesMap = [
    {
      imageName: details1,
      styleName: ` -left-[50%]  ${detailStyleName} `,
      refName: firstImage,
    },
    {
      imageName: details2,
      styleName: ` -left-[75%]  ${detailStyleName}`,
      refName: secondImage,
    },
    {
      imageName: details3,
      styleName: ` -left-[50%] ${detailStyleName}`,
      refName: thirdImage,
    },
    {
      imageName: details4,
      styleName: `-left-[50%] ${detailStyleName}`,
      refName: fourthImage,
    },
  ];

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container2.current,
            start: "-25% bottom",
            end: "bottom 75%",
            scrub: true,
            // markers: {
            //   startColor: "green",
            //   endColor: "red",
            //   fontSize: "12px",
            // },
          },
        })
        .to(firstImage.current, { rotate: -10, x: "75%" }, 0)
        .to(secondImage.current, { rotate: 10, x: "175%" }, 0)
        .to(detailTransition.current, { x: 450 }, 0);
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
            scrub: true,
          },
        })
        .to(thirdImage.current, { rotate: -10, x: "175%" }, 0)
        .to(fourthImage.current, { rotate: 10, x: "225%" }, 0);
    });
    return () => context.revert();
  }, []);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: containerDetails.current,
            start: "top center",
            end: "75% center",
            scrub: true,
          },
        })
        .to(dressCodeList.current, { y: "-25%" }, 0)
        .to(dressCodeList1.current, { y: "-25%" }, 0)
        .to(menuList.current, { y: "-25%" }, 0);
    });
    return () => context.revert();
  }, []);
  return (
    <div className="relative">
      <div className="relative -top-[15rem] h-full lg:h-full">
        <div
          ref={container22}
          className="h-[100vh] overflow-clip lg:h-[125vh] lg:overflow-visible"
        >
          <div
            ref={container2}
            className="relative top-[65%] flex h-1/2 w-full -translate-y-1/2 gap-5 text-center lg:top-[65%]"
          >
            {/* IMAGES */}
            {detailsImagesMap.map((image, index) => {
              return (
                <DetailsImageTransition
                  key={index}
                  imageName={image.imageName}
                  styleName={image.styleName}
                  refName={image.refName}
                />
              );
            })}
            <div
              ref={detailTransition}
              className="lg:2-[85%] absolute -left-1/2 top-1/4 -z-10 h-[50%] w-1/2 rotate-[-45deg] scale-[2.5] place-content-center sm:scale-[2.5] md:w-[75%] lg:-left-[35%] lg:scale-[3]"
              style={{
                backgroundImage: `url("${detailsTransition}")`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
        {/* Details */}
        <div
          ref={containerDetails}
          className="relative flex h-fit flex-col items-center gap-5 lg:-top-[20%]"
        >
          <div className="flex max-w-[1024px] flex-col items-center">
            <div className="text-pageTitle relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac">
              Details
            </div>
            <div className="flex h-fit w-[85%] min-w-[150px] flex-col items-center gap-28 text-center">
              {/* Dress Code */}
              <div className="text-entourage-list relative top-[20px] flex size-full flex-col items-center justify-center gap-5 font-Coldiac md:top-[45px] md:leading-7 lg:top-[30px] lg:gap-10">
                <div
                  ref={dressCodeList}
                  className="h-[100px] w-full"
                  style={{
                    backgroundImage: `url("${detailsDressCodeFrame}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="size-full text-center text-2xl font-bold lg:text-4xl">
                  Dress Code
                </div>
                <div className="flex h-fit w-[85%] items-center justify-center lg:leading-9">
                  <div>
                    {dressCode0.map((char, index) => {
                      return char === "formal" ? (
                        <span
                          key={index}
                          className="border-b-4 border-motif font-bold italic"
                        >
                          {char}{" "}
                        </span>
                      ) : (
                        <span className="" key={index}>
                          {char}{" "}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex h-[15vh] w-[85%] items-center justify-center lg:h-[20vh] lg:leading-9">
                  <div>
                    {dressCode1.map((char, index) => {
                      return char === "Kindly" ? (
                        <span
                          key={index}
                          className="rounded-l-lg border-motif bg-motif font-bold italic text-ivory"
                        >
                          {char}{" "}
                        </span>
                      ) : char === "avoid" || char === "wearing" ? (
                        <span
                          key={index}
                          className="border-motif bg-motif font-bold italic text-ivory"
                        >
                          {char}{" "}
                        </span>
                      ) : char === "white" ? (
                        <span
                          key={index}
                          className="rounded-r-lg border-motif bg-motif font-bold italic text-ivory"
                        >
                          {char}{" "}
                        </span>
                      ) : char === "For" || char === "Women:" ? (
                        <span
                          key={index}
                          className="border-b-4 border-motif font-bold italic"
                        >
                          {char}{" "}
                        </span>
                      ) : (
                        <span key={index}>{char} </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex h-[15vh] w-[85%] items-center justify-center lg:h-[20vh] lg:leading-9">
                  <div>
                    {dressCode2.map((char, index) => {
                      return char === "For" || char === "Men:" ? (
                        <span
                          key={index}
                          className="border-b-4 border-motif font-bold italic"
                        >
                          {char}{" "}
                        </span>
                      ) : (
                        <span key={index}>{char} </span>
                      );
                    })}
                  </div>
                </div>
                {/* Colors */}
                <div className="flex w-[75%] justify-center gap-2 py-2">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="aspect-square size-[15%] rounded-full border-[1px] border-solid border-black sm:size-[10%] lg:size-[10%]"
                      style={{
                        background: `${"" + color + ""}`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  ref={dressCodeList1}
                  className="relative -bottom-[20px] h-[100px] w-full bg-orange-500/0"
                  style={{
                    backgroundImage: `url("${detailsDressCodeFrame}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    rotate: "180deg",
                  }}
                ></div>
                <div
                  className="absolute top-1/2 h-[10%] w-full -translate-y-[75%] opacity-25 sm:-translate-y-[125%]"
                  style={{
                    backgroundImage: `url("${detailsDressCode}")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
              {/* Note on Gifts */}
              <div className="relative flex w-[95%] flex-col items-center justify-center max-sm:h-[40vh] sm:h-[45vh] sm:w-[85%] md:h-[65vh]">
                <div className="text-entourage-list absolute -top-[15%] flex w-[95%] flex-col items-center justify-center font-Coldiac max-sm:h-[40vh] sm:h-[45vh] sm:w-[85%] md:h-[65vh]">
                  {/* <div className="text-entourage-list 500 flex w-full items-center justify-center border-4 border-solid border-motif font-Coldiac max-sm:h-[40vh] sm:h-[45vh] md:h-[60vh] md:w-[85%] lg:w-[95%]"> */}
                  <div className="flex hidden h-[90%] w-[80%] flex-col items-center justify-center bg-red-500/0 md:leading-7 lg:leading-9">
                    <div className="flex size-full basis-[55%] flex-col items-center justify-center bg-lime-500/0">
                      <p className="text-2xl font-bold md:text-3xl lg:text-4xl">
                        A note on Gifts
                      </p>
                    </div>
                  </div>
                  <div className="relative flex size-full basis-[20%] justify-center">
                    <div className="absolute top-[75%] h-full w-fit bg-ivory text-2xl font-bold md:text-3xl lg:text-4xl">
                      A note on gifts
                    </div>
                  </div>
                  <div className="size-full border-4 border-solid border-motif">
                    <div className="flex size-full basis-full flex-col items-center justify-center gap-5 bg-blue-500/0 max-sm:gap-2">
                      <p className="grid w-[85%] basis-1/4 place-items-center">
                        {gift[0]}
                      </p>
                      <p className="grid w-[85%] basis-1/4 place-items-center max-sm:mt-3">
                        {gift[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* The Menu */}
              <div className="relative flex w-[100%] flex-col items-center">
                <div className="flex w-fit flex-col items-center sm:gap-10">
                  <div className="mb-3 flex h-fit min-w-[150px] flex-col items-center sm:mb-0">
                    <div className="text-center font-Coldiac text-2xl font-bold md:text-3xl lg:text-4xl">
                      The Menu
                    </div>
                  </div>
                  <Card title={"Soup"} list={soup} />
                  <Card title={"Salad"} list={salad} />
                  <Card title={"Main Courses"} list={mainCourses} />
                  <Card title={"Past"} list={pasta} />
                  <Card title={"Dessert"} list={dessert} />
                </div>
                <div
                  ref={menuList}
                  className="absolute top-[25%] -z-10 size-full pb-[25%] pt-[20%] sm:h-[100%]"
                  style={{
                    backgroundImage: `url("${detailsFrame}")`,
                    backgroundSize: `${width < 550 ? "cover" : "contain"}`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    scale: "1.15",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Frame />
    </div>
  );
};

export default Details;

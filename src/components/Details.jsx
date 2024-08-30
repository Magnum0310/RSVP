import { useRef, useLayoutEffect, forwardRef } from "react";
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
  detailsDressCode,
  detailsDressCodeFrame,
} = Image;
const { dressCode, colors, soup, salad, mainCourses, pasta, dessert } =
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
            end: "bottom 60%",
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
    // <div className="relative -top-32 h-[225vh] bg-cyan-500 lg:h-full">
    <div className="relative -top-[15rem] h-full bg-cyan-500/0 lg:h-full">
      <div
        ref={container22}
        className="h-[125vh] overflow-clip lg:overflow-visible"
      >
        <div
          ref={container2}
          // className="relative top-1/2 flex h-1/2 w-full -translate-y-1/2 gap-5 text-center lg:top-[60%]"
          className="relative top-[60%] flex h-1/2 w-full -translate-y-1/2 gap-5 text-center lg:top-[60%]"
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
            className="lg:2-[85%] absolute -left-1/2 top-1/4 -z-10 h-[50%] w-1/2 rotate-[-45deg] scale-[2.5] place-content-center sm:scale-[2] md:w-[75%] lg:-left-[35%] lg:scale-[3]"
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
        // className="relative -top-[15%] flex h-fit flex-col items-center gap-5 lg:-top-[20%]"
      >
        <div className="flex max-w-[1024px] flex-col items-center">
          <div className="text-pageTitle relative z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac">
            Details
          </div>
          <div className="flex h-fit w-[85%] min-w-[150px] flex-col items-center gap-28 text-center">
            {/* Dress Code */}
            <div className="relative flex size-full flex-col items-center justify-center gap-5 lg:top-[20px]">
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
              <div className="size-full text-center font-Coldiac text-2xl lg:text-4xl">
                Dress Code
              </div>
              {dressCode.map((item, index) => (
                <div
                  key={index}
                  className="text-entourage-list font-Coldiac sm:leading-6"
                >
                  {item}
                </div>
              ))}
              {/* Colors */}
              <div className="flex w-[75%] justify-center gap-2 py-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square size-[15%] rounded-full border-[1px] border-solid border-black lg:size-[10%]"
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
                className="h-[100px] w-full"
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
            {/* The Menu */}
            <div className="relative flex w-[100%] flex-col items-center">
              <div className="flex w-fit flex-col items-center sm:gap-10">
                <div className="mb-3 flex h-fit min-w-[150px] flex-col items-center sm:mb-0">
                  <div className="text-center font-Coldiac text-2xl lg:text-4xl">
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
                  backgroundSize: "contain",
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
  );
};

export default Details;

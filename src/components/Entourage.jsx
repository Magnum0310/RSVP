import { useRef, useLayoutEffect } from "react";
import Image from "../constants/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Info from "../constants/entourage";
import EntourageCard from "./EntourageCard";
import EntourageCardPrincipal from "./EntourageCardPrincipal";

gsap.registerPlugin(ScrollTrigger);

// Image assets
const {
  entourage1,
  entourage2,
  entourage3,
  entourageCenter,
  entourageTransition,
  entourageDivider,
  entourageFloralMaidOfHonor,
  entourageFloralPrimarySponsor,
  entourageFloralSecondarySponsor,
  entourageTitle,
} = Image;

// Invitation Details
const {
  parentsOfTheBride,
  parentsOfTheGroom,
  principalSponsorsMale,
  principalSponsorsFemale,
  maidOfHonor,
  bestMan,
  bridesMaid,
  groomsMen,
  candle,
  cord,
  veil,
  ringBearer,
  coinBearer,
  bibleBearer,
  flowerGirls,
} = Info;

const Entourage = () => {
  const container1 = useRef(null);
  const imageCenter = useRef(null);
  const imageTransition = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const image3 = useRef(null);
  const entourageTitleFloral = useRef(null);
  const primarySponsory = useRef(null);
  const secondarySponsory = useRef(null);
  const entourageMaidOfHonor = useRef(null);

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
        .to(imageCenter.current, { y: 200 }, 0)
        .to(imageTransition.current, { y: 250 }, 0)
        .to(image1.current, { rotate: 12, y: -350 }, 0)
        .to(image2.current, { rotate: -5, y: -750 }, 0)
        .to(image3.current, { rotate: -18, y: -1050 }, 0)
        .to(entourageTitleFloral.current, { y: -200 }, 0)
        .to(primarySponsory.current, { y: -350 }, 0)
        .to(entourageMaidOfHonor.current, { y: -450 }, 0)
        .to(secondarySponsory.current, { y: -350 }, 0);
    });
    return () => context.revert();
  }, []);

  return (
    // Main Page
    <div className="h-fit">
      {/* Inner Wrapper */}
      <div
        ref={container1}
        className="relative flex size-full flex-col justify-center overflow-hidden"
      >
        {/* Entourage Images - Position:Absolute */}
        <div className="relative h-[75vh] w-full">
          <div className="absolute h-1/4 w-full">
            <div
              ref={imageCenter}
              className="relative top-0 z-10 h-[300%] w-full"
              style={{
                backgroundImage: `url(${entourageCenter})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              ref={image1}
              className="relative left-[3%] top-[55%] z-10 h-[150%] w-[30%]"
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
              className="relative left-1/2 top-[15%] z-20 h-[200%] w-[40%] -translate-x-1/2"
              style={{
                backgroundImage: `url(${entourage2})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                rotate: "5deg",
              }}
            ></div>
            <div
              ref={image3}
              className="relative -top-[15%] left-[65%] z-10 h-[135%] w-[35%]"
              style={{
                backgroundImage: `url(${entourage3})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                rotate: "10deg",
              }}
            ></div>
            <div
              ref={imageTransition}
              className="absolute top-40 z-[5] h-full w-full"
              style={{
                backgroundImage: `url(${entourageTransition})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                scale: "3.5",
              }}
            ></div>
          </div>
        </div>
        {/* Entourage Contents */}
        <div className="relative top-[27%] flex size-full flex-col items-center text-3xl">
          <div className="relative top-[10%] z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac">
            The Entourage
          </div>
          {/* MAIN CONTENT WRAPPER */}
          <div className="relative top-[10%] mt-10 flex w-full flex-col gap-5">
            {/* Parents */}
            {/* <div className="absolute top-[5%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard
                title={"Parents of the Bride"}
                list={parentsOfTheBride}
              />
              <EntourageCard
                title={"Parents of the Groom"}
                list={parentsOfTheGroom}
              />
            </div>
            {/* Principal Sponsors */}
            {/* <div className="absolute top-[9%] flex w-full flex-col items-center"> */}
            <div className="flex w-full flex-col items-center">
              <EntourageCardPrincipal
                list1={principalSponsorsMale}
                list2={principalSponsorsFemale}
                title={"Principal Sponsors"}
              />
            </div>
            {/* Maid of Honor and Best Man */}
            {/* <div className="absolute top-[20%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Maid of Honor"} list={maidOfHonor} />
              <EntourageCard title={"Best Man"} list={bestMan} />
            </div>
            {/* Groomsmen and Bridesmaid */}
            {/* <div className="absolute top-[23%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Groomsmen"} list={groomsMen} />
              <EntourageCard title={"BridesMaid"} list={bridesMaid} />
            </div>
            {/* Secondary Sponsor */}
            {/* <div className="absolute top-[31%] flex h-fit min-w-[150px] flex-col items-center"> */}
            <div className="flex h-fit min-w-[150px] flex-col items-center">
              <div className="text-center font-Showtime text-2xl">
                Secondary Sponsors
              </div>
              <div
                className="mb-2 h-[10px] w-full"
                style={{
                  backgroundImage: `url("${entourageDivider}")`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
            {/* Candle and Cord */}
            {/* <div className="absolute top-[33%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Candle"} list={candle} />
              <EntourageCard title={"Cord"} list={cord} />
            </div>
            {/* Veil */}
            {/* <div className="absolute top-[36%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Veil"} list={veil} />
            </div>
            {/* Ring and Coin Bearer */}
            {/* <div className="absolute top-[39%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Ring Bearer"} list={ringBearer} />
              <EntourageCard title={"Coin Bearer"} list={coinBearer} />
            </div>{" "}
            {/* Bible bearer and Flower girls */}
            {/* <div className="absolute top-[42%] flex w-full justify-center gap-12"> */}
            <div className="flex w-full justify-center gap-12">
              <EntourageCard title={"Bible Bearer"} list={bibleBearer} />
              <EntourageCard title={"Flower Girls"} list={flowerGirls} />
            </div>
          </div>
          {/* Entourage Background Images - Position:Absolute */}
          <div
            className="absolute top-[10%] h-full w-full"
            ref={entourageTitleFloral}
          >
            {/* Title */}
            <div
              className="relative top-[5%] -z-10 h-[15%] w-full opacity-25"
              style={{
                backgroundImage: `url(${entourageTitle})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                rotate: "180deg",
              }}
            ></div>
            {/* Primary Sponsors */}
            <div
              ref={primarySponsory}
              className="relative top-[30%] -z-10 h-[15%] w-full opacity-25"
              style={{
                backgroundImage: `url(${entourageFloralPrimarySponsor})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                scale: ".6",
              }}
            ></div>
            {/* Maid of Honor and BestMan*/}
            <div
              ref={entourageMaidOfHonor}
              className="relative top-[45%] -z-10 h-[15%] w-full opacity-25"
              style={{
                backgroundImage: `url(${entourageFloralMaidOfHonor})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                scale: ".6",
              }}
            ></div>
            {/* Secondary Sponsors*/}
            <div
              ref={secondarySponsory}
              className="relative top-[55%] -z-10 h-[15%] w-full opacity-25"
              style={{
                backgroundImage: `url(${entourageFloralSecondarySponsor})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                scale: ".7",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entourage;
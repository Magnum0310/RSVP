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

console.log(principalSponsorsFemale);

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
        .to(imageCenter.current, { y: 500 }, 0)
        .to(imageTransition.current, { y: 350 }, 0)
        .to(image1.current, { rotate: 25, y: -550 }, 0)
        .to(image2.current, { rotate: -5, y: -250 }, 0)
        .to(image3.current, { rotate: -18, y: -300 }, 0)
        .to(entourageTitleFloral.current, { y: -250 }, 0)
        .to(primarySponsory.current, { y: -250 }, 0)
        .to(entourageMaidOfHonor.current, { y: -250 }, 0)
        .to(secondarySponsory.current, { y: -250 }, 0);
    });
    return () => context.revert();
  }, []);

  return (
    // Main Page
    <div className="h-[400vh]">
      {/* Inner Wrapper */}
      <div
        ref={container1}
        className="relative flex size-full justify-center overflow-hidden"
      >
        {/* Entourage Images - Position:Absolute */}
        <div className="absolute h-1/4 w-full opacity-100">
          <div
            ref={imageCenter}
            className="absolute top-0 z-10 h-[60%] w-full"
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
            className="absolute left-[3%] top-[80%] z-10 h-1/4 w-[30%]"
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
            className="absolute left-1/2 top-[65%] z-20 h-[30%] w-[40%] -translate-x-1/2"
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
            className="absolute right-[3%] top-[60%] z-10 h-[20%] w-[27%]"
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
            className="absolute bottom-[5%] z-[5] h-full w-full"
            style={{
              backgroundImage: `url(${entourageTransition})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              scale: "2",
            }}
          ></div>
        </div>
        {/* Entourage Contents */}
        <div className="relative top-[27%] flex size-full flex-col items-center text-3xl">
          <div className="h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac">
            The Entourage
          </div>
          {/* Parents */}
          <div className="absolute top-[5%] flex w-full justify-center gap-12">
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
          <div className="absolute top-[9%] flex w-full flex-col items-center">
            <EntourageCardPrincipal
              list1={principalSponsorsMale}
              list2={principalSponsorsFemale}
              title={"Principal Sponsors"}
            />
          </div>
          {/* Maid of Honor and Best Man */}
          <div className="absolute top-[20%] flex w-full justify-center gap-12">
            <EntourageCard title={"Maid of Honor"} list={maidOfHonor} />
            <EntourageCard title={"Best Man"} list={bestMan} />
          </div>
          {/* Groomsmen and Bridesmaid */}
          <div className="absolute top-[23%] flex w-full justify-center gap-12">
            <EntourageCard title={"Groomsmen"} list={groomsMen} />
            <EntourageCard title={"BridesMaid"} list={bridesMaid} />
          </div>
          {/* Secondary Sponsor */}
          <div className="absolute top-[31%] flex h-fit min-w-[150px] flex-col items-center">
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
          <div className="absolute top-[33%] flex w-full justify-center gap-12">
            <EntourageCard title={"Candle"} list={candle} />
            <EntourageCard title={"Cord"} list={cord} />
          </div>
          {/* Veil */}
          <div className="absolute top-[37%] flex w-full justify-center gap-12">
            <EntourageCard title={"Veil"} list={veil} />
          </div>
          {/* Ring and Coin Bearer */}
          <div className="absolute top-[41%] flex w-full justify-center gap-12">
            <EntourageCard title={"Ring Bearer"} list={ringBearer} />
            <EntourageCard title={"Coin Bearer"} list={coinBearer} />
          </div>{" "}
          {/* Bible bearer and Flower girls */}
          <div className="absolute top-[45%] flex w-full justify-center gap-12">
            <EntourageCard title={"Bible Bearer"} list={bibleBearer} />
            <EntourageCard title={"Flower Girls"} list={flowerGirls} />
          </div>
          {/* Entourage Background Images - Position:Absolute */}
          <div className="absolute h-full w-full" ref={entourageTitleFloral}>
            {/* Title */}
            <div
              className="absolute top-[5%] -z-10 h-[15%] w-full opacity-25"
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
              className="absolute top-[19%] -z-10 h-[15%] w-full opacity-25"
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
              className="absolute top-[32%] -z-10 h-[15%] w-full opacity-25"
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
              className="absolute top-[48%] -z-10 h-[15%] w-full opacity-25"
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

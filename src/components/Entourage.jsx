import { useRef, useLayoutEffect, useContext } from "react";
import Image from "../constants/Image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Info from "../constants/entourage";
import EntourageCard from "./EntourageCard";
import EntourageCardPrincipal from "./EntourageCardPrincipal";
import UserformContext from "@/context/UserformContext";
import PictureFrame from "./PictureFrame";

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

  const { width } = useContext(UserformContext);

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
        .to(imageTransition.current, { y: 150 }, 0)
        .to(image1.current, { rotate: 9, y: -350 }, 0)
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
    <div className="relative">
      <div className="">
        {/* Inner Wrapper */}
        <div
          ref={container1}
          className="relative flex size-full flex-col items-center justify-center overflow-hidden"
        >
          {/* Entourage Images - Position:Absolute */}
          <div className="relative z-[10] h-[75vh] w-full sm:h-[100vh]">
            <div className="absolute h-1/4 w-full">
              <div
                ref={imageCenter}
                className={`relative left-1/2 top-0 z-10 flex ${width < 460 ? "h-[240%]" : "h-[300%]"} w-[65%] -translate-x-1/2 items-center justify-center border-[0px] border-solid border-black bg-white sm:h-[275%] sm:w-[55%] lg:h-[325%] lg:w-[45%] xl:w-[40%]`}
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${entourageCenter})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
              <div
                ref={image1}
                className={`relative left-[3%] z-10 flex ${width < 460 ? "top-[75%] h-[140%] w-[35%]" : "h-[150%]"} w-[30%] items-center justify-center border-[0px] border-solid border-black bg-white sm:-top-[35%] sm:left-[0%] sm:h-[175%] lg:-top-[55%] lg:left-[3%] lg:h-[215%] xl:-top-[50%] xl:left-[7%] xl:w-[25%]`}
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${entourage1})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
              <div
                ref={image2}
                className={`relative left-1/2 top-[15%] z-20 flex ${width < 460 ? "top-[55%] h-[150%]" : "h-[200%]"} w-[40%] -translate-x-1/2 items-center justify-center border-[0px] border-solid border-black bg-white sm:-top-[75%] sm:w-[35%] lg:-top-[175%] lg:h-[215%] lg:w-[30%] xl:-top-[190%] xl:w-[25%]`}
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${entourage2})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
              <div
                ref={image3}
                className={`relative -top-[15%] left-[65%] z-10 flex ${width < 460 ? "top-[10%] h-[145%] w-[30%]" : "h-[170%]"} w-[35%] items-center justify-center border-[0px] border-solid border-black bg-white sm:-top-[155%] sm:h-[180%] sm:w-[35%] lg:-top-[315%] lg:left-[68%] lg:h-[215%] lg:w-[30%] xl:-top-[325%] xl:w-[25%]`}
              >
                <div className="flex size-[90%] flex-col">
                  <div
                    className="basis-[85%]"
                    style={{
                      backgroundImage: `url(${entourage3})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              </div>
              <div
                ref={imageTransition}
                className="absolute top-[85%] z-[5] h-full w-full scale-[3] opacity-25 lg:top-72"
                style={{
                  backgroundImage: `url(${entourageTransition})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          </div>
          {/* Entourage Contents */}
          <div className="relative top-[27%] flex size-full max-w-[1024px] flex-col items-center">
            <div className="text-pageTitle relative top-[10%] z-20 h-fit w-[85%] border-b-4 border-t-4 border-solid border-barley py-6 text-center font-Coldiac">
              The Entourage
            </div>
            {/* MAIN CONTENT WRAPPER */}
            <div className="relative top-[10%] z-20 mt-10 flex w-full flex-col items-center gap-5 sm:gap-8 lg:gap-16">
              {/* Parents */}
              <div className="flex items-start justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
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
              <div className="flex w-full flex-col items-center lg:w-[85%]">
                <EntourageCardPrincipal
                  list1={principalSponsorsMale}
                  list2={principalSponsorsFemale}
                  title={"Principal Sponsors"}
                />
              </div>
              {/* Maid of Honor and Best Man */}
              <div className="flex w-full justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Maid of Honor"} list={maidOfHonor} />
                <EntourageCard title={"Best Man"} list={bestMan} />
              </div>
              {/* Groomsmen and Bridesmaid */}
              <div className="flex w-full justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Groomsmen"} list={groomsMen} />
                <EntourageCard title={"BridesMaid"} list={bridesMaid} />
              </div>
              {/* Secondary Sponsor */}
              <div className="flex h-fit min-w-[150px] flex-col items-center">
                <div className="text-entourage-title text-center font-Showtime">
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
              <div className="flex w-full justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Candle"} list={candle} />
                <EntourageCard title={"Cord"} list={cord} />
              </div>
              {/* Veil */}
              <div className="flex w-full justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Veil"} list={veil} />
              </div>
              {/* Ring and Coin Bearer */}
              <div className="flex w-full justify-center gap-0 max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Ring Bearer"} list={ringBearer} />
                <EntourageCard title={"Coin Bearer"} list={coinBearer} />
              </div>{" "}
              {/* Bible bearer and Flower girls */}
              <div className="flex min-h-[250px] w-full justify-center gap-0 max-sm:min-h-[150px] max-sm:gap-0 lg:w-[85%] lg:gap-10">
                <EntourageCard title={"Bible Bearer"} list={bibleBearer} />
                <EntourageCard title={"Flower Girl"} list={flowerGirls} />
              </div>
            </div>
            {/* Entourage Background Images - Position:Absolute */}
            <div
              className="absolute top-[10%] h-full w-full"
              ref={entourageTitleFloral}
            >
              {/* Title */}
              {/* Primary Sponsors */}
              <div
                ref={primarySponsory}
                className="relative top-[30%] -z-10 h-[15%] w-full scale-[.7] opacity-15 sm:h-[12%] sm:scale-100 lg:top-[15%]"
                style={{
                  backgroundImage: `url(${entourageFloralPrimarySponsor})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              {/* Maid of Honor and BestMan*/}
              <div
                ref={entourageMaidOfHonor}
                className="relative top-[45%] -z-10 h-[15%] w-full scale-[.6] opacity-15 sm:h-[12%] sm:scale-100"
                style={{
                  backgroundImage: `url(${entourageFloralMaidOfHonor})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              {/* Secondary Sponsors*/}
              <div
                ref={secondarySponsory}
                className="relative top-[55%] -z-10 h-[15%] w-full scale-[.6] opacity-15 sm:h-[12%] sm:scale-100"
                style={{
                  backgroundImage: `url(${entourageFloralSecondarySponsor})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entourage;

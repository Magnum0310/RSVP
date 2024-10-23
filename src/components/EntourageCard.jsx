import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCard = ({ title, list, coldiac }) => {
  return (
    // <div className="flex h-fit min-w-[180px] flex-col items-center bg-orange-500 sm:min-w-[250px]">
    <div className="flex min-w-[190px] basis-[35%] flex-col items-center bg-lime-500/0 text-center md:basis-[45%] lg:basis-1/2">
      <div className={`text-entourage-title relative right-1 font-Showtime`}>
        {/* <div
        className={`text-center font-${coldiac ? "Coldiac" : "AnastasiaScript"} text-entourage-title bg-lime-500`}
      > */}
        {title}
      </div>
      <div
        className="mb-2 h-[10px] w-[80%]"
        style={{
          backgroundImage: `url("${entourageDivider}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {/* <div className="flex size-full flex-col justify-center "> */}
      {list.map((item, index) => (
        <div
          key={index}
          className="text-entourage-list mt-2 grid place-items-center max-sm:h-[2.5rem] max-sm:w-[75%] sm:mt-3 md:mt-5 lg:mt-8"
        >
          {item}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
};

export default EntourageCard;

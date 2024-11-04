import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCard = ({ title, list, coldiac }) => {
  return (
    <div
      className={`flex ${title === "Parents of the Bride" || title === "Parents of the Groom" ? "min-h-[160px]" : "h-full"} min-w-[190px] basis-[35%] flex-col items-center text-center sm:min-w-[270px] md:basis-[45%] lg:basis-1/2`}
    >
      <div className={`text-entourage-title relative right-1 font-Showtime`}>
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
      {list.map((item, index) => (
        <div
          key={index}
          className="text-entourage-list mt-2 grid flex-1 place-items-center max-sm:h-fit max-sm:w-[75%] sm:mt-3 md:mt-5 lg:mt-8"
        >
          {item}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
};

export default EntourageCard;

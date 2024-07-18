import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCard = ({ title, list }) => {
  return (
    <div className="flex h-fit min-w-[150px] flex-col items-center">
      <div className="text-center font-Showtime text-2xl">{title}</div>
      <div
        className="mb-2 h-[10px] w-full"
        style={{
          backgroundImage: `url("${entourageDivider}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      {list.map((item, index) => (
        <div key={index} className="font-Coldiac text-[.65rem] leading-5">
          {item}
        </div>
      ))}
    </div>
  );
};

export default EntourageCard;

import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCard = ({ title, list, coldiac }) => {
  return (
    <div className="flex h-fit min-w-[150px] flex-col items-center sm:min-w-[250px]">
      <div
        className={`text-center font-${coldiac ? "Coldiac" : "Showtime"} text-entourage-title`}
      >
        {title}
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
      {list.map((item, index) => (
        <div
          key={index}
          className="text-entourage-list font-Coldiac sm:mt-2 lg:mt-5"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default EntourageCard;

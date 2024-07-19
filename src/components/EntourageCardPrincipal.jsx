import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCardPrincipal = ({ title, list1, list2 }) => {
  return (
    <div className="flex h-fit flex-col items-center">
      <div className="w-full text-center font-Showtime text-2xl">{title}</div>
      <div
        className="mb-2 h-[10px] w-1/2"
        style={{
          backgroundImage: `url("${entourageDivider}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex gap-12 text-center">
        <div className="size-fit">
          {list1.map((item, index) => (
            <div key={index} className="font-Coldiac text-xs leading-5">
              {item}
            </div>
          ))}
        </div>
        <div className="size-fit">
          {list2.map((item, index) => (
            <div key={index} className="font-Coldiac text-xs leading-5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntourageCardPrincipal;

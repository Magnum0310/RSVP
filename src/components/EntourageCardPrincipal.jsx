import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCardPrincipal = ({ title, list1, list2 }) => {
  return (
    <div className="flex h-fit flex-col items-center bg-orange-500/0">
      <div className="text-entourage-title w-full text-center font-Showtime">
        {title}
      </div>
      <div
        className="mb-2 h-[10px] w-1/2"
        style={{
          backgroundImage: `url("${entourageDivider}")`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="text-entourage-list flex gap-5 bg-lime-500/0 text-center lg:gap-24 xl:gap-52">
        <div className="size-fit min-w-[200px] bg-blue-500/0 sm:min-w-[250px]">
          {list1.map((item, index) => (
            <div key={index} className="font-Coldiac sm:mt-2 lg:mt-5">
              {item}
            </div>
          ))}
        </div>
        <div className="size-fit min-w-[200px] sm:min-w-[250px]">
          {list2.map((item, index) => (
            <div key={index} className="font-Coldiac sm:mt-2 lg:mt-5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntourageCardPrincipal;

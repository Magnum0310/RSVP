import Image from "../constants/Image";

const { entourageDivider } = Image;

const EntourageCardPrincipal = ({ title, list1, list2 }) => {
  return (
    <div className="flex h-fit w-full flex-col items-center">
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
      <div className="text-entourage-list flex w-full justify-center gap-5 text-center max-sm:gap-2 lg:gap-10">
        <div className="min-w-[180px] basis-[35%] md:basis-[45%] lg:basis-1/2">
          {list1.map((item, index) => (
            <div
              key={index}
              className="mt-2 font-Coldiac sm:mt-3 md:mt-5 lg:mt-8"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="min-w-[180px] basis-[35%] md:basis-[45%] lg:basis-1/2">
          {list2.map((item, index) => (
            <div
              key={index}
              className="mt-2 font-Coldiac sm:mt-3 md:mt-5 lg:mt-8"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntourageCardPrincipal;

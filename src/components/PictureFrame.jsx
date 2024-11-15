import React from "react";

const PictureFrame = ({ imageRef, imageFrame, width, left, right }) => {
  console.log(left);
  console.log(right);
  return (
    <div
      ref={imageRef}
      className={`absolute ${left} top-[40%] z-10 flex ${width < 460 ? "top-[10%] h-[10%] w-[30%]" : "h-[10%]"} w-[35%] rotate-[-10deg] items-center justify-center border-[1px] border-solid border-black bg-white sm:h-[180%] sm:w-[35%] lg:left-[68%] lg:h-[215%] lg:w-[30%] xl:w-[25%]`}
      //   className={`relative -top-[15%] left-[65%] z-10 flex ${width < 460 ? "top-[10%] h-[145%] w-[30%]" : "h-[170%]"} w-[35%] items-center justify-center border-[1px] border-solid border-black bg-white sm:-top-[155%] sm:h-[180%] sm:w-[35%] lg:-top-[315%] lg:left-[68%] lg:h-[215%] lg:w-[30%] xl:-top-[325%] xl:w-[25%]`}
    >
      <div className="flex size-[90%] flex-col">
        <div
          className="basis-[85%]"
          style={{
            backgroundImage: `url(${imageFrame})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default PictureFrame;

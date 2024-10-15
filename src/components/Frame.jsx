import { useContext } from "react";
import Image from "../constants/Image";
import UserformContext from "@/context/UserformContext";
// import Card from "../components/LocationCard";

const { frame } = Image;

const Frame = () => {
  const { width } = useContext(UserformContext);
  return (
    <div className="">
      {/* FRAME */}
      <div className="absolute top-0 -z-50 size-full">
        {/* First Left frame */}
        <div className="absolute -top-1/4 right-[50%] flex size-full scale-50 flex-col max-lg:right-[53%] max-md:right-[56%] max-sm:right-[60%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,-1)",
            }}
          ></div>
        </div>
        {/* Second Left frame  */}
        <div className="absolute right-[50%] top-1/4 flex size-full scale-50 flex-col max-lg:right-[53%] max-md:right-[56%] max-sm:right-[60%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(-1,-1)",
            }}
          ></div>
        </div>

        {/* First Right frame */}
        <div className="absolute -top-1/4 left-[50%] flex size-full scale-50 flex-col max-lg:left-[53%] max-md:left-[56%] max-sm:left-[60%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,-1)",
            }}
          ></div>
        </div>
        {/* Second Right frame */}
        <div className="absolute left-[50%] top-1/4 flex size-full scale-50 flex-col max-lg:left-[53%] max-md:left-[56%] max-sm:left-[60%]">
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,1)",
            }}
          ></div>
          <div
            className="basis-1/2"
            style={{
              backgroundImage: `url("${frame}")`,
              backgroundSize: `${width < 1064 ? "cover" : "contain"}`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: "scale(1,-1)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Frame;

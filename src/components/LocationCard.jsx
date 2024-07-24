import React from "react";

const LocationCard = ({ image, title, address, link }) => {
  return (
    <div className="relative flex size-full flex-col items-center justify-center bg-white font-Coldiac">
      <div className="flex size-[90%] flex-col items-center gap-2">
        <div
          className={`w-full ${link ? "basis-3/4" : "basis-[85%]"}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className={`flex ${!link && "hidden"} basis-1/4 flex-col items-center gap-2 text-center`}
        >
          <span>
            <p className="text-xl">{title}</p>
            <span className="text-xs">{address}</span>
          </span>
          <a
            href={link}
            className="w-[50%] rounded-xl bg-slate-300"
            target="_blank"
          >
            Open Map
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;

import React, { useState } from "react";
import RoadmapHeader from "@/components/RoadmapHeader";

type StatusData = {
  [key: string]: {
    status: JSX.Element[];
    description: string;
  };
};
const RoadmapList: React.FC<{
  statusData: StatusData;
}> = ({ statusData }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Az in-progress tömb az alapértelmezett aktív tömb

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const renderStatusItemsMobile = () => {
    const activeStatus = Object.keys(statusData)[
      activeIndex
    ] as keyof typeof statusData;
    return statusData[activeStatus].status.map(
      (item: JSX.Element, index: number) => (
        <div key={index}>
          {index === 0 && (
            <div className="ml-[16px] ">
              {" "}
              <h2 className="mt-4 text-h3 capitalize text-custom-very-dark-gray ">
                {" "}
                {activeStatus} ({statusData[activeStatus].status.length})
              </h2>
              <p className="text-[13px] text-custom-gray">
                {statusData[activeStatus].description}
              </p>
            </div>
          )}
          <div className="p-4">{item}</div>
        </div>
      )
    );
  };

  type StatusColors = {
    [key: string]: string;
  };

  const statusColors: StatusColors = {
    live: "border-custom-light-blue",
    inProgress: "border-custom-purple",
    planned: "border-custom-light-orange",
  };

  return (
    <>
      <RoadmapHeader />
      <div className="flex w-full flex-col items-center">
        {/* Státusz választó gombok */}
        <div className="mt-4 flex w-[327px] justify-between md:hidden ">
          {Object.keys(statusData).map((status, index) => (
            <button
              key={index}
              className={` h-[44px] text-[13px] capitalize text-custom-gray ${
                activeIndex === index
                  ? ` border-b-4 pt-1 font-bold text-custom-very-dark-gray  ${statusColors[status]}`
                  : "border-none"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {status} ({statusData[status].status.length})
            </button>
          ))}
        </div>

        <div className="h-[1px] w-full bg-[#f3ecec] md:hidden"></div>

        {/* Mobil nézet */}
        <div className="sm:hidden">{renderStatusItemsMobile()}</div>

        {/* Desktop és tablet nézet */}
        <div className="hidden md:flex md:w-[689px] xl:w-[1110px]">
          <div className="w-1/3 mt-6">
            <h2 className="pl-1 pb-[4px] text-h4 xl:text-h3">Live ({statusData.live.status.length})</h2>
            <p className="pl-1 text-body2 text-custom-gray xl:text-body1">{statusData.live.description}</p>

            {statusData.live.status.map((item, index) => (
              <div key={index} className="p-1">
                {item}
              </div>
            ))}
          </div>
          <div className="w-1/3 mt-6">
            <h2 className="pl-1 pb-[4px] text-h4 xl:text-h3">In-Progress ({statusData.inProgress.status.length})</h2>
            <p className="pl-1 text-body2 text-custom-gray xl:text-body1">{statusData.inProgress.description}</p>
            {statusData.inProgress.status.map((item, index) => (
              <div key={index} className="p-1">
                {item}
              </div>
            ))}
          </div>
          <div className="w-1/3 mt-6">
            <h2 className="pl-1 pb-[4px] text-h4 xl:text-h3">Planned ({statusData.planned.status.length})</h2>
            <p className="pl-1 text-body2 text-custom-gray xl:text-body1">{statusData.planned.description}</p>
            {statusData.planned.status.map((item, index) => (
              <div key={index} className="p-1">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapList;

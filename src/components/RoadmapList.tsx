import React, { useState } from "react";
import RoadmapHeader from "@/components/RoadmapHeader";
import ChangeStatusBtns from "./Ui/buttons/ChangeStatusBtns";
import Live from "./RoadmapComponents/Live";
import InProgress from "./RoadmapComponents/InProgress";
import Planned from "./RoadmapComponents/Planned";
import StatusItemsOnMobile from "./RoadmapComponents/StatusItemsOnMobile";

export type StatusData = {
  [key: string]: {
    status: JSX.Element[];
    description: string;
  };
};
export type StatusColors = {
  [key: string]: string;
};

const RoadmapList: React.FC<{
  statusData: StatusData;
}> = ({ statusData }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Az in-progress tömb az alapértelmezett aktív tömb

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
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
        {/* Mobil view */}
        <ChangeStatusBtns
          statusData={statusData}
          statusColors={statusColors}
          activeIndex={activeIndex}
          handleTabClick={handleTabClick}
        />

        {/* Mobil view */}
        <StatusItemsOnMobile
          statusData={statusData}
          activeIndex={activeIndex}
        />

        {/* Desktop & tablet view */}
        <div className="hidden md:flex md:w-[689px] xl:w-[1110px]">
          <Live statusData={statusData} />
          <InProgress statusData={statusData} />
          <Planned statusData={statusData} />
        </div>
      </div>
    </>
  );
};

export default RoadmapList;

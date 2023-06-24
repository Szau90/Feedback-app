import { useState } from "react";
import CategoryList from "./CategoryList";
import Logo from "./Logo";
import { RoadmapLabel } from "./RoadmapLabel";
import { MobileMenu } from "./MobileMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Feedback from "@/models/feedback";

export const Navigation: React.FC<{
  planned: number;
  inProgress: number;
  live: number;
  feedback: Feedback[]
}> = ({ planned, inProgress, live, feedback }) => {

const showMenu = useSelector((state: RootState) => state.ui.showMobileMenu)

  return (
    <>
      <section className="relative w-full md:static md:mt-[40px] md:flex md:w-[689px] md:gap-[10px] xl:w-[255px] xl:flex-col xl:gap-[24px] ">
        <Logo  />
        {showMenu && (
          <MobileMenu  feedback={feedback}/>
        )}
        <div className="hidden h-[595px] w-[271px] flex-col items-center gap-[24px] bg-custom-light-gray pt-[24px] md:static md:flex md:h-[178px] md:w-[456px] md:flex-row md:gap-[10px] md:bg-inherit md:pt-0 xl:h-[368px] xl:w-[255px] xl:flex-col xl:gap-[24px]">
          <CategoryList />
          <RoadmapLabel  feedback={feedback}/>
        </div>
      </section>
    </>
  );
};

import { useState } from "react";
import CategoryList from "./CategoryList";
import Logo from "./Logo";
import { RoadmapLabel } from "./RoadmapLabel";
import { MobileMenu } from "./MobileMenu";

export const Navigation: React.FC<{
  planned: number;
  inProgress: number;
  live: number;
}> = (props) => {
  const { planned, inProgress, live } = props;

  const [showNav, setShowNav] = useState(false);

  const clickHandler = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <section className="relative w-full md:static md:mt-[39px] md:flex md:w-[689px] md:gap-[10px] xl:w-[255px] xl:flex-col xl:gap-[24px] ">
        <Logo action={clickHandler} showNav={showNav} />
        {showNav && (
          <MobileMenu planned={planned} inProgress={inProgress} live={live} />
        )}
        <div className="right-0inset-y-0 absolute inset-y-0 right-0 top-[72px] hidden h-[595px] w-[271px] flex-col items-center gap-[24px] bg-custom-light-gray pt-[24px] md:static md:flex md:h-[178px] md:w-[456px] md:flex-row md:gap-[10px] md:bg-inherit md:pt-0 xl:h-[368px] xl:w-[255px] xl:flex-col xl:gap-[24px]">
          <CategoryList />
          <RoadmapLabel planned={planned} inProgress={inProgress} live={live} />
        </div>
      </section>
    </>
  );
};

import { RoadmapList } from "./RoadmapList";
import CategoryList from "./CategoryList";

export const MobileMenu: React.FC<{
  planned: number;
  inProgress: number;
  live: number;
}> = ({ planned, inProgress, live }) => {
  return (
    <>
      <div className="right-0inset-y-0 absolute inset-y-0 right-0 top-[72px] z-50 flex h-[595px] w-[271px] flex-col items-center gap-[24px] bg-custom-light-gray pt-[24px] md:hidden ">
        <CategoryList />
        <RoadmapList planned={planned} inProgress={inProgress} live={live} />
      </div>
    </>
  );
};

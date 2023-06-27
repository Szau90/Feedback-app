import { RoadmapLabel } from "./RoadmapLabel";
import CategoryList from "./CategoryList";
import Feedback from "@/models/feedback";

export const MobileMenu: React.FC<{
  feedback: Feedback[];
}> = ({ feedback }) => {
  return (
    <>
      <div className="right-0inset-y-0 absolute inset-y-0 right-0 top-[72px] z-50 flex h-[595px] w-[271px] flex-col items-center gap-[24px] bg-custom-light-gray pt-[24px] md:hidden ">
        <CategoryList />
        <RoadmapLabel feedback={feedback} />
      </div>
    </>
  );
};

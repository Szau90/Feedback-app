import Feedback from "@/models/feedback";
import Link from "next/link";
import RoadmapNav from "./RoadmapNav";

export const RoadmapLabel: React.FC<{

  feedback: Feedback[];
}> = ({ feedback }) => {
  
  return (
    <>
      <div className="flex h-[178px] w-[223px] flex-col items-center justify-center rounded-[10px] bg-white xl:w-[255px] ">
        <div className="mb-[23px] flex w-[175px] flex-row items-center justify-between">
          <h3 className="inline-block text-h3 text-custom-very-dark-gray">
            Roadmap
          </h3>
          <Link
            className="inline-block text-body3 text-custom-dark-blue"
            href={"/roadmap"}
          >
            View
          </Link>
        </div>
        <ul className="flex w-[175px] flex-col text-body1">
            <RoadmapNav feedback={feedback} />
        </ul>
      </div>
    </>
  );
};

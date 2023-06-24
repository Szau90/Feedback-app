import { useRouter } from "next/router";
import GoBackBtn from "./Ui/buttons/GoBackBtn";
import MainBtn from "./Ui/buttons/MainBtn";

const RoadmapHeader = () => {
  const router = useRouter();

  const clickHandler = () => {
    router.back();
  };
  return (
    <>
      <div className="flex h-[100px] w-full flex-row items-center justify-between bg-custom-very-dark-gray px-[24px] md:mt-[56px] md:w-[689px] md:rounded-[10px] xl:w-[1110px]">
        <div className="flex flex-col items-center justify-center">
          <GoBackBtn label="Go Back" text="text-white" action={clickHandler} />
          <h2 className="text-h3 text-white">Roadmap</h2>
        </div>
        <div className="w-[134px]">
          <MainBtn
            label="+ Add Feedback"
            action={() => {}}
            background="bg-custom-purple"
          />
        </div>
      </div>
    </>
  );
};

export default RoadmapHeader;

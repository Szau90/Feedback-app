import { useRouter } from "next/router";
import GoBackBtn from "./Ui/buttons/GoBackBtn";
import MainBtn from "./Ui/buttons/MainBtn";

const RoadmapHeader = () => {

  const router = useRouter()

  const clickHandler = () => {
    router.back()
  }
  return (
    <>
      <div className="bg-custom-very-dark-gray flex flex-row h-[100px] w-full items-center px-[24px] justify-between md:w-[689px] md:rounded-[10px] md:mt-[56px] xl:w-[1110px]">
        <div className="flex flex-col justify-center items-center">
          <GoBackBtn label="Go Back" text="text-white" action={clickHandler} />
          <h2 className="text-white text-h3">Roadmap</h2>
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

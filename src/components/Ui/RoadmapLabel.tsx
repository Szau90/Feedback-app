import Link from "next/link";

export const RoadmapLabel: React.FC<{
  planned: number;
  inProgress: number;
  live: number;
}> = (props) => {
  const { planned, inProgress, live } = props;

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
          <li className=" flex h-[23px] items-center justify-between">
            <div className="flex w-[93px] flex-row items-center justify-between">
              <div className="h-[8px] w-[8px] rounded-full bg-custom-light-orange" />{" "}
              <p className="w-[75px]">planned</p>
            </div>{" "}
            <span className="text-custom-gray text-body1 font-bold">
              {planned}
            </span>
          </li>
          <li className=" flex h-[23px]  justify-between">
            <div className="flex w-[93px] flex-row items-center justify-between">
              <div className="h-[8px] w-[8px] rounded-full bg-custom-purple" />{" "}
              <p className="w-[75px]">in-progress</p>
            </div>{" "}
            <span className="text-custom-gray text-body1 font-bold">
              {inProgress}
            </span>
          </li>
          <li className=" flex h-[23px]  justify-between">
            <div className="flex w-[93px] flex-row items-center justify-between">
              <div className="h-[8px] w-[8px] rounded-full bg-custom-light-blue" />{" "}
              <p className="w-[75px]">live</p>
            </div>{" "}
            <span className="text-custom-gray text-body1 font-bold">
              {live}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

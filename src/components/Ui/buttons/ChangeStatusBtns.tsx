import { StatusColors, StatusData } from "@/components/RoadmapList";

const ChangeStatusBtns: React.FC<{
  statusData: StatusData;
  statusColors: StatusColors;
  activeIndex: number;
  handleTabClick: (index: number) => void;
}> = ({ statusData, statusColors, activeIndex, handleTabClick }) => {
  return (
    <>
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
    </>
  );
};

export default ChangeStatusBtns;

import { StatusData } from "../RoadmapList";

const StatusItemsOnMobile: React.FC<{
  statusData: StatusData;
  activeIndex: number;
}> = ({ statusData, activeIndex }) => {
  const activeStatus = Object.keys(statusData)[
    activeIndex
  ] as keyof typeof statusData;

  const statusItems = statusData[activeStatus].status.map(
    (item: JSX.Element, index: number) => (
      <div key={index}>
        {index === 0 && (
          <div className="ml-[16px] ">
            {" "}
            <h2 className="mt-4 text-h3 capitalize text-custom-very-dark-gray ">
              {" "}
              {activeStatus} ({statusData[activeStatus].status.length})
            </h2>
            <p className="text-[13px] text-custom-gray">
              {statusData[activeStatus].description}
            </p>
          </div>
        )}
        <div className="p-4">{item}</div>
      </div>
    )
  );

  return <div className="sm:hidden">{statusItems}</div>;
};

export default StatusItemsOnMobile;

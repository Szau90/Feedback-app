import Feedback from "@/models/feedback";

const RoadmapNav: React.FC<{ feedback: Feedback[] }> = ({ feedback }) => {
  const statusCounts: { [key: string]: number } = {};

  feedback.forEach((item) => {
    if (statusCounts[item.status]) {
      statusCounts[item.status]++;
    } else {
      statusCounts[item.status] = 1;
    }
  });

  const statusLabels: { [key: string]: string } = {
    Planned: "planned",
    "In-Progress": "in-progress",
    Live: "live",
  };

  const statusList = Object.keys(statusLabels).map((status) => ({
    status,
    label: statusLabels[status],
    count: statusCounts[status] || 0,
    color:
      status === "Live"
        ? "light-blue"
        : status === "In-Progress"
        ? "purple"
        : status === "Planned"
        ? "light-orange"
        : "",
  }));

  return (
    <>
      {statusList.map((item) => (
        <li
          className="flex h-[23px] items-center justify-between"
          key={item.status}
        >
          <div className="flex w-[93px] flex-row items-center justify-between">
            <div
              className={`h-[8px] w-[8px] rounded-full bg-custom-${item.color}`}
            />{" "}
            <p className="w-[75px]">{item.status}</p>
          </div>{" "}
          <span className="text-body1 font-bold text-custom-gray">
            {item.count}
          </span>
        </li>
      ))}
    </>
  );
};

export default RoadmapNav;

import { StatusData } from "../RoadmapList";
import RoadmapDescription from "./RoadmapDescription";
import RoadmapItem from "./RoadmapItem";
import RoadmapTitle from "./RoadmapTitle";

const Planned: React.FC<{ statusData: StatusData }> = ({ statusData }) => {
  return (
    <div className="mt-6 w-1/3">
      <RoadmapTitle title="planned" length={statusData.planned.status.length} />
      <RoadmapDescription description={statusData.planned.description} />
      <RoadmapItem statusArray={statusData.planned.status} />
    </div>
  );
};

export default Planned;

import { StatusData } from "../RoadmapList";
import RoadmapDescription from "./RoadmapDescription";
import RoadmapItem from "./RoadmapItem";
import RoadmapTitle from "./RoadmapTitle";

const Live: React.FC<{ statusData: StatusData }> = ({ statusData }) => {
  return (
    <div className="mt-6 w-1/3">
      <RoadmapTitle title="live" length={statusData.live.status.length} />
      <RoadmapDescription description={statusData.live.description} />

      <RoadmapItem statusArray={statusData.live.status} />
    </div>
  );
};

export default Live;

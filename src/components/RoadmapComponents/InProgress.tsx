import RoadmapItem from "./RoadmapItem";
import { StatusData } from "../RoadmapList";
import RoadmapDescription from "./RoadmapDescription";
import RoadmapTitle from "./RoadmapTitle";

const InProgress:React.FC<{statusData:StatusData}> = ({statusData}) => {
    return (
        <div className="mt-6 w-1/3">
         <RoadmapTitle title="In-Progress" length={statusData.inProgress.status.length} />
          <RoadmapDescription description={statusData.inProgress.description}/>
            <RoadmapItem statusArray={statusData.inProgress.status} /> 
         
          </div>
    ) 
};

export default InProgress;
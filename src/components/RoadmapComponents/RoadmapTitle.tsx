import { StatusData } from "../RoadmapList";

const RoadmapTitle: React.FC<{ title: string; length: number }> = ({
  title,
  length,
}) => {
  return (
    <h2 className="pb-[4px] pl-1 text-h4 capitalize xl:text-h3">
      {title} ({length})
    </h2>
  );
};

export default RoadmapTitle;

const RoadmapItem: React.FC<{ statusArray: JSX.Element[] }> = ({
  statusArray,
}) => {
  return (
    <>
      {statusArray.map((item, index) => (
        <div key={index} className="p-1">
          {item}
        </div>
      ))}
    </>
  );
};

export default RoadmapItem;

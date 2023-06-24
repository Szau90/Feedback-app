const RoadmapDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <p className="pl-1 text-body2 text-custom-gray xl:text-body1">
      {description}
    </p>
  );
};

export default RoadmapDescription;

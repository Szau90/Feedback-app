import { ReactNode } from "react";
import classNames from "classnames";

const RoadmapItemWrapper: React.FC<{ children: ReactNode; status: string }> = ({
  children,
  status,
}) => {
  const borderColor = classNames({
    "border-t-[6px]": true,
    "rounded-[6px]": true,
    "border-custom-purple": status === "In-Progress",
    "border-custom-light-blue": status === "Live",
    "border-custom-light-orange": status === "Planned",
  });
  return (
    <div
      className={`mt-[20px] ${borderColor} box-border flex h-[233px] w-[327px] items-center justify-center rounded-lg border-0 bg-white md:h-[251px] md:w-[223px] xl:h-[252px] xl:w-[350px] `}
    >
      {children}
    </div>
  );
};

export default RoadmapItemWrapper;

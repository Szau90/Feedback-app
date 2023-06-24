import classNames from "classnames";

const Status:React.FC<{status:string}> = ({status}) => {
    const bgColor = classNames({
        "bg-custom-purple": status === "In-Progress",
        "bg-custom-light-blue": status === "Live",
        "bg-custom-light-orange": status === "Planned",
      });
    return (
        <div className="mb-[16px] flex h-[19px] flex-row items-center gap-2">
        <div
          className={`h-[8px] w-[8px] rounded-full ${bgColor} `}
        ></div>
        <p className="text-[13px] capitalize leading-[19px] text-custom-gray xl:text-body1 ">
          {status}
        </p>
      </div>
    )
};

export default Status;
import { Comments } from "@/models/feedback";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classNames from "classnames";

const RoadmapItem: React.FC<{
  id: number;
  title: string;
  comments: Comments[];
  category: string;
  description: string;
  upvotes: number;
  status: string;
}> = (props) => {
  const { id, title, comments, category, description, upvotes, status } = props;

  const [hasComment, setHasComment] = useState(false);

  useEffect(() => {
    if (comments) {
      setHasComment(true);
    }
  }, [comments]);

  const router = useRouter();

  const clickHandler = () => {
    router.push(`/${id}`);
  };

  const borderColor = classNames({
    "border-t-[6px]": true,
    "rounded-[6px]":true,
    "border-custom-purple": status === "in-progress",
    "border-custom-light-blue": status === "live",
    "border-custom-light-orange": status === "planned",
  });
  const bgColor = classNames({
    "bg-custom-purple": status === "in-progress",
    "bg-custom-light-blue": status === "live",
    "bg-custom-light-orange": status === "planned",
  });
  
  return (
    <>
      <ul
        onClick={clickHandler}
        className={`${borderColor}  mt-[20px]   cursor-pointer xl:w-[350px]  `}
      >
        <li className=" box-border flex h-[233px] w-[327px] items-center justify-center rounded-lg border-0 bg-white md:w-[223px] md:h-[251px] xl:w-[350px] xl:h-[252px] ">
          <div className="flex flex-col ">
            <div className="flex-col ">
              <div className="mb-[16px] flex h-[19px] flex-row items-center gap-2">
                <div
                  className={`h-[8px] w-[8px] rounded-full ${bgColor} `}
                ></div>
                <p className="text-[13px] capitalize leading-[19px] text-custom-gray xl:text-body1 ">
                  {status}
                </p>
              </div>

              <h1 className="w-[278px] text-[13px] font-bold tracking-[-0.18px] text-custom-very-dark-gray md:w-[183px] xl:w-[286px] xl:text-h3">
                {title}
              </h1>
              <p className="font-regular mt-[9px] w-[278px] text-[13px] text-custom-gray  md:w-[183px] xl:w-[286px] xl:text-body1 ">
                {description}
              </p>
              <p className="mt-[9px] w-max rounded-lg bg-custom-very-light-gray px-3 py-[5.5px] text-body3 capitalize text-custom-dark-blue ">
                {category}
              </p>
            </div>
            <div className="mt-[9px] flex items-center justify-between">
              <div className=" inline-flex  h-[32px] w-[69px] items-center justify-around rounded-[10px] bg-custom-very-light-gray ">
                <Image
                  src={"/assets/shared/icon-arrow-up.svg"}
                  width={10}
                  height={7}
                  alt="arrow up"
                  style={{ objectFit: "contain" }}
                />
                <p className="text-[13px] font-bold tracking-[-0.18px]">
                  {upvotes}
                </p>
              </div>
              <div className="inline-flex">
                {" "}
                <Image
                  src={"/assets/shared/icon-comments.svg"}
                  width={18}
                  height={16}
                  style={{ objectFit: "contain" }}
                  alt="comments"
                />
                <p className="ml-[9px] text-[13px] font-bold tracking-[-0.18px]">
                  {!hasComment ? 0 : comments.length}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default RoadmapItem;

import { Comments } from "@/models/feedback";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  selectCommentsLength,
  selectRepliesLength,
} from "../store/commentSelector";

const FeedbackList: React.FC<{
  id: number;
  title: string;
  comments: Comments[];
  category: string;
  description: string;
  upvotes: number;
  status: string;
}> = (props) => {
  const { id, title, comments, category, description, upvotes, status } = props;

  



  const router = useRouter();

  const clickHandler = () => {
    router.push(`/${id}`);
  };

  const borderColor =
    status === "in-progress"
      ? " border-t-4 border-custom-purple"
      : status === "live"
      ? " border-t-4 border-custom-light-blue"
      : status === "planned"
      ? " border-t-[6px] rounded-l border-custom-light-orange"
      : "";

  const roadmap = router.pathname === "/roadmap";
  const border = roadmap ? ` ${borderColor}` : "";

  let commentsLength = comments ? comments.length : 0;
  let replyLength = 0;

  if (comments) {
    for (let i = 0; i < commentsLength; i++) {
      if (comments[i].replies) {
        replyLength += comments[i].replies.length;
      }
    }
  }

  const totalLength = commentsLength + replyLength;

  return (
    <>
      <div
        onClick={clickHandler}
        className={`${border}  mt-[20px] w-[327px]  cursor-pointer  xl:h-[151px] xl:w-[825px]`}
      >
        <li className=" box-border flex h-[200px] w-[327px] items-center justify-center rounded-lg border-0 bg-white md:h-[151px] md:w-[689px]  xl:w-[825px]">
          <div className="flex flex-col md:h-[95px] md:w-[625px] md:flex-row md:justify-between xl:w-[761px]">
            <div className="hidden h-[32px] w-[69px] items-center justify-around rounded-[10px] bg-custom-very-light-gray md:flex md:h-[53px] md:w-[40px] md:flex-col">
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
            <div className="flex-col  md:w-[476px] xl:mr-[120px]">
              { roadmap &&
                <div className="flex flex-row items-center gap-2 h-[19px] mb-[16px]">
                  <div className="h-[8px] w-[8px] rounded-full bg-custom-light-orange"></div>
                  <p className="text-[13px] leading-[19px] capitalize text-custom-gray ">{status}</p>
                </div>
              }
              <h1 className="w-[278px] text-[13px] font-bold tracking-[-0.18px] text-custom-very-dark-gray md:w-max  md:text-h3">
                {title}
              </h1>
              <p className="font-regular mt-[9px] w-[278px] text-[13px] text-[#647196] md:w-max md:text-body1 ">
                {description}
              </p>
              <p className="mt-[9px] w-max rounded-lg bg-custom-very-light-gray px-3 py-[5.5px] text-body3 capitalize text-custom-dark-blue ">
                {category}
              </p>
            </div>
            <div className="mt-[9px] flex items-center justify-between">
              <div className=" inline-flex  h-[32px] w-[69px] items-center justify-around rounded-[10px] bg-custom-very-light-gray md:hidden">
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
                  {totalLength}
                </p>
              </div>
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default FeedbackList;

import { Replies } from "@/models/feedback";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReplyList: React.FC<{ replies: Replies[]; commentIndex:number; }> = ({ replies, commentIndex }) => {
  const noreply = replies === undefined;
  const allReplies =
    !noreply &&
    replies.map((reply, index) => (
      <React.Fragment key={index}>
        { index === 0 && commentIndex !==0 && <div className="w-[1px] h-[216px] absolute  inset-x-0 md:-top-20 md:left-5 bg-custom-gray opacity-20 md:h-[267px]"></div>}
        <div
          className={`flex h-[180px] w-[280px] flex-col mb-[16px] items-end md:items-start justify-start md:w-[578px] xl:w-[714px] `}
        >
          <div className="w-[256px] md:w-[578px] xl:w-[714px]">
            <div className="mb-[16px] flex ">
              <li>
                <Image
                  src={reply.user.image}
                  width={40}
                  height={40}
                  alt="user image"
                  className="mr-[16px] rounded-full md:mr-[32px]"
                />
              </li>
              <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[478px]">
                <li className="text-body3 text-custom-very-dark-gray md:text-h4">
                  {reply.user.name}
                </li>
                <li className="text-[13px] text-custom-gray md:text-[14px]">
                  @{reply.user.username}
                </li>
              </div>
              <Link
                href={"/"}
                className="text-[13px] font-bold text-custom-dark-blue "
              >
                Reply
              </Link>
            </div>
            <li className="text-[13px] text-custom-gray md:ml-[71px] md:w-[508px] md:text-[15px] xl:w-[550px]">
              <span className="font-bold text-custom-purple md:text-[15px]">
                @{reply.replyingTo} {""}
              </span>
              {reply.content}
            </li>
          </div>
        </div>
      </React.Fragment>
    ));

  return (
    <>
      <ul className="mt-[24px] !border-none md:flex  md:flex-col md:items-end relative">
        {allReplies}
      </ul>
    </>
  );
};

export default ReplyList;

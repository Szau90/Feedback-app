import { Comments } from "@/models/feedback";
import ReplyList from "./ReplyList";
import Image from "next/image";
import Link from "next/link";
import React from 'react'

const CommentList: React.FC<{ comments: Comments[] }> = ({ comments }) => {
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

  const  hasComment = comments !== undefined

  return (
    <ul className="mt-[24px] rounded-[10px] bg-white ">
    <h3 className="text-h3 text-custom-very-dark-gray my-[24px] ml-[24px]">
      {totalLength} Comments
    </h3>
    {hasComment &&
      comments.map((comment, index) => (
        <React.Fragment key={index}>
          <div
            key={index}
            className='flex w-[327px] flex-col items-center md:w-[689px] xl:w-[825px]'
          >
            <div
              className='block w-[280px]  items-center  md:w-[625px] xl:w-[761px]'
            >
              <div className={`h-fit w-[280px] md:w-[625px] xl:w-[761px] ${
                index === 0 ? 'first:border-b  md:first:h-[155px]' : ''
              }`}>
                <div className="mb-[16px] flex justify-center  ">
                  <li>
                    <Image
                      src={comment.user.image}
                      width={40}
                      height={40}
                      alt="user image"
                      className="mr-[16px] md:mr-[32px] rounded-full"
                    />
                  </li>
                  <div className=" mr-[71px] w-[120px] md:w-[130px] md:mr-[390px] xl:mr-[525px] ">
                    <li className="text-body3 text-custom-very-dark-gray md:text-h4">
                      {comment.user.name}
                    </li>
                    <li className="text-[13px] text-custom-gray md:text-[14px]">
                      @{comment.user.username}
                    </li>
                  </div>
                  <Link
                    href={"/"}
                    className="text-[13px] font-bold text-custom-dark-blue "
                  >
                    Reply
                  </Link>
                </div>
                <li className="text-[13px] text-custom-gray pb-5 md:text-[15px] md:w-[553px] md:ml-[72px] xl:w-[594px] ">
                  {comment.content}
                </li>
              </div>
              <ReplyList key={index} replies={comment.replies} commentIndex={index} />
              </div>
            </div>
          </React.Fragment>
        ))}
    </ul>
  );
};

export default CommentList;

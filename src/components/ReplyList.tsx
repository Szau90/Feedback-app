import React from "react";
import { Comments, Replies } from "@/models/feedback";
import Image from "next/image";
import ReplyToReplyForm from "./Forms/ReplyToReplyForm";
import Name from "./userComponents/Name";
import UserName from "./userComponents/UserName";
import ReplyingTo from "./userComponents/ReplyingTo";
import ReplyToReplyBtn from "./Ui/buttons/ReplyToReplyBtn";
import ReplyListWrapper from "./Ui/wrappers/ReplyListWrapper";

const ReplyList: React.FC<{
  replies: Replies[];
  commentIndex: number;
  comments: Comments[];
  feedbackId: number;
  actualCommentId: number;
}> = ({ replies, commentIndex, comments, feedbackId, actualCommentId }) => {
  return (
    <>
      <div className="relative mt-[24px] !border-none  md:flex md:flex-col md:items-end">
        {replies.map((reply, index) => (
          <ReplyListWrapper key={index + 100} index={index} commentIndex={commentIndex}>
            <div className="mb-[16px] flex ">
              <Image
                src={reply.user.image}
                width={40}
                height={40}
                alt="user image"
                className="mr-[16px] rounded-full md:mr-[32px]"
              />

              <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[478px]">
                <Name name={reply.user.name} />
                <UserName userName={reply.user.username} />
              </div>
              <ReplyToReplyBtn commentId={actualCommentId} reply={reply} />
            </div>
            <ReplyingTo reply={reply} />
            {reply.showReply && (
              <ReplyToReplyForm
                commentId={actualCommentId}
                comments={comments}
                feedbackId={feedbackId}
                reply={reply}
              />
            )}
          </ReplyListWrapper>
        ))}
      </div>
    </>
  );
};

export default ReplyList;

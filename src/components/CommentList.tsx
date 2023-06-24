import React from "react";
import { Comments } from "@/models/feedback";
import Image from "next/image";
import ReplyList from "./ReplyList";
import { useAppDispatch } from "@/store/store";
import { handleReplyToComment } from "@/store/commentsSlice";
import Name from "./userComponents/Name";
import UserName from "./userComponents/UserName";
import ReplyBtn from "./Ui/buttons/ReplyBtn";
import CommentContent from "./userComponents/CommentContent";
import ReplyForm from "./Forms/ReplyForm";
import CommentListWrapper from "./Ui/wrappers/CommentListWrapper";

const CommentList: React.FC<{
  comments: Comments[];
  feedbackId: number;
}> = ({ comments, feedbackId }) => {
  const dispatch = useAppDispatch();

  const clickReplyHandler = (commentId: number) => {
    dispatch(handleReplyToComment({ comments, commentId }));
  };

  return (
    <ul>
      {comments.map((comment, index) => (
        <li
          key={comment.id * 100}
          className="flex w-[327px] flex-col items-center md:w-[689px] xl:w-[825px]"
        >
          <div className="block w-[280px]  items-center  md:w-[625px] xl:w-[761px]">
            <CommentListWrapper
              index={index}
              showReply={comment.showReply}
            >
              <div className="mb-[16px] flex justify-center  ">
                <Image
                  src={comment.user.image}
                  width={40}
                  height={40}
                  alt="user image"
                  className="mr-[16px] rounded-full md:mr-[32px]"
                />

                <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[525px] ">
                  <Name name={comment.user.name} />
                  <UserName userName={comment.user.username} />
                </div>
                <ReplyBtn
                  replyHandler={clickReplyHandler}
                  commentId={comment.id}
                />
              </div>
              <CommentContent content={comment.content} />
              {comment.showReply && (
                <ReplyForm
                  feedbackId={feedbackId}
                  comments={comments}
                  commentId={comment.id}
                  userName={comment.user.username}
                />
              )}
            </CommentListWrapper>
            <ReplyList
              key={index}
              replies={comment.replies}
              commentIndex={index}
              comments={comments}
              feedbackId={feedbackId}
              actualCommentId={comment.id}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

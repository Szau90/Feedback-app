import React, { useState } from "react";
import { Comments, Replies } from "@/models/feedback";
import Image from "next/image";
import MainBtn from "./Ui/buttons/MainBtn";
import ReplyList from "./ReplyList";
import { useAppDispatch } from "@/store/store";
import { sendReply, setReply, handleReplyToComment } from "@/store/commentsSlice";

const CommentList: React.FC<{
  comments: Comments[];
  feedbackId: number;
}> = ({ comments, feedbackId }) => {
  const dispatch = useAppDispatch();
  const [enteredReply, setEnteredReply] = useState("");

  const replyChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredReply(event.target.value);
  };

  const submitHandler = (
    event: React.FormEvent,
    commentId: number,
    replyingTo: string,
    comments: Comments[]
  ) => {
    event.preventDefault();

    const reply: Replies = {
      id: Math.floor(Math.random() * 10000),
      content: enteredReply,
      replyingTo: replyingTo,
      user: {
        id:999,
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround",
      },
      showReply: false,
    };

    const updatedReply = { reply, commentId };
    const updatedReply2 = { reply, feedbackId, commentId };
    const data = {comments, commentId }
    
    
    dispatch(handleReplyToComment(data))
    dispatch(sendReply(updatedReply2));
    dispatch(setReply(updatedReply));
    setEnteredReply("");
   
    
  };

  const clickReplyHandler = (commentId:number) => {
    const data = {comments, commentId }
    dispatch(handleReplyToComment(data))
  }

  const content = comments.map((comment, index) => (
    <React.Fragment key={index}>
      <div
        key={index}
        className="flex w-[327px] flex-col items-center md:w-[689px] xl:w-[825px]"
      >
        <div className="block w-[280px]  items-center  md:w-[625px] xl:w-[761px]">
          <div
            className={`h-fit w-[280px] md:w-[625px] xl:w-[761px] ${
              index === 0
                ? `first:border-b  md:first:${
                    comment.showReply === true ? "h-fit" : "h-[155px]"
                  }`
                : ""
            } `}
          >
            <div className="mb-[16px] flex justify-center  ">
              <li>
                <Image
                  src={comment.user.image}
                  width={40}
                  height={40}
                  alt="user image"
                  className="mr-[16px] rounded-full md:mr-[32px]"
                />
              </li>
              <div className=" mr-[71px] w-[120px] md:mr-[390px] md:w-[130px] xl:mr-[525px] ">
                <li className="text-body3 text-custom-very-dark-gray md:text-h4">
                  {comment.user.name}
                </li>
                <li className="text-[13px] text-custom-gray md:text-[14px]">
                  @{comment.user.username}
                </li>
              </div>
              <button
                onClick={() => clickReplyHandler(comment.id)}
                className="text-[13px] font-bold text-custom-dark-blue "
              >
                Reply
              </button>
            </div>
            <li className="pb-5 text-[13px] text-custom-gray md:ml-[72px] md:w-[553px] md:text-[15px] xl:w-[594px] ">
              {comment.content}
            </li>
            {comment.showReply && (
              <form
                onSubmit={(event) =>
                  submitHandler(event, comment.id, comment.user.username, comments)
                }
                className="mb-6 ml-[72px]  flex  flex-row gap-[16px]"
              >
                <textarea
                  className="resize-none rounded-[10px] border border-custom-dark-blue bg-custom-very-light-gray  text-body1 font-normal text-custom-very-dark-gray outline-none xl:h-[80px] xl:w-[556px]"
                  onChange={replyChangeHandler}
                  value={enteredReply}
                />
                <div className="w-[117px]">
                  <MainBtn
                    btnType="submit"
                    background="bg-custom-purple"
                    action={() => {}}
                    label="Post Reply"
                  />
                </div>
              </form>
            )}
          </div>

          <ReplyList
            key={index}
            replies={comment.replies}
            commentIndex={index}
            comments={comments}
            feedbackId={feedbackId}
            actualCommentId={comment.id}
          />
        </div>
      </div>
    </React.Fragment>
  ));

  return <div>{content}</div>;
};

export default CommentList;

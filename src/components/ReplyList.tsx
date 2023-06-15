import { Comments, Replies } from "@/models/feedback";
import Image from "next/image";
import React, { useState } from "react";
import MainBtn from "./Ui/buttons/MainBtn";
import {
  setComments,
  handleReplyToReply,
  sendReplyToReply,
} from "@/store/commentsSlice";
import { useAppDispatch } from "@/store/store";

const ReplyList: React.FC<{
  replies: Replies[];
  commentIndex: number;
  comments: Comments[];
  feedbackId: number;
  actualCommentId: number;
}> = ({ replies, commentIndex, comments, feedbackId, actualCommentId }) => {
  const dispatch = useAppDispatch();

  const [enteredReply, setEnteredReply] = useState("");

  const replyChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredReply(event.target.value);
  };

  const clickReplyHandler = (commentId: number, replyId: number) => {
    const data = { commentId, replyId };
    dispatch(handleReplyToReply(data));
  };

  const submitHandler = (
    event: React.FormEvent,
    replyingTo: string,
    commentId: number,
    replyId: number
  ) => {
    event.preventDefault();

    const handleReplydata = { commentId, replyId };

    const reply: Replies = {
      id: Math.floor(Math.random() * 1000),
      content: enteredReply,
      replyingTo: replyingTo,
      user: {
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround",
      },
      showReply: false,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === actualCommentId) {
        const updatedReplies = comment.replies.map((existingReply) => {
          if (existingReply.id === replyId) {
            return {
              ...existingReply,
              showReply: false,
            };
          }
          return existingReply;
        });

        return {
          ...comment,
          replies: [...updatedReplies, reply],
        };
      }
      return comment;
    });

    const sendReplyData = { reply, feedbackId, commentId };

    dispatch(handleReplyToReply(handleReplydata));

    dispatch(setComments(updatedComments));

    dispatch(sendReplyToReply(sendReplyData));

    setEnteredReply("");
  };

  return (
    <>
      <ul className="relative mt-[24px] !border-none  md:flex md:flex-col md:items-end">
        {replies.map((reply, index) => (
          <React.Fragment key={index}>
            {index === 0 && commentIndex !== 0 && (
              <div className="absolute inset-x-0 h-[216px]  w-[1px] bg-custom-gray opacity-20 md:-top-20 md:left-5 md:h-[267px]"></div>
            )}
            <div
              className={`mb-[16px] flex h-fit w-[280px] flex-col items-end justify-start md:w-[578px] md:items-start xl:w-[714px] `}
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
                  <button
                    onClick={() => clickReplyHandler(actualCommentId, reply.id)}
                    className="text-[13px] font-bold text-custom-dark-blue "
                  >
                    Reply
                  </button>
                </div>
                <li className="text-[13px] text-custom-gray md:ml-[71px] md:w-[508px] md:text-[15px] xl:w-[550px]">
                  <span className="font-bold text-custom-purple md:text-[15px]">
                    @{reply.replyingTo} {""}
                  </span>
                  {reply.content}
                </li>
                {reply.showReply && (
                  <form
                    onSubmit={(event) =>
                      submitHandler(
                        event,
                        reply.user.username,
                        actualCommentId,
                        reply.id
                      )
                    }
                    className="ml-[72px] flex  flex-row  gap-[16px]"
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
            </div>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default ReplyList;

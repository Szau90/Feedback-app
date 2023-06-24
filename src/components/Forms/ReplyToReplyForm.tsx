import MainBtn from "../Ui/buttons/MainBtn";
import { Comments, Replies } from "@/models/feedback";
import React, { useState } from "react";
import {
  setComments,
  handleReplyToReply,
  sendReplyToReply,
} from "@/store/commentsSlice";
import { useAppDispatch } from "@/store/store";

const ReplyToReplyForm: React.FC<{
  comments: Comments[];
  feedbackId: number;
  commentId: number;
  reply: Replies;
}> = ({ commentId, comments, feedbackId, reply }) => {
  const dispatch = useAppDispatch();
  const [enteredReply, setEnteredReply] = useState("");

  const replyChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnteredReply(event.target.value);
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
        id: 998,
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround",
      },
      showReply: false,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
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
    <form
      onSubmit={(event) =>
        submitHandler(event, reply.user.username, commentId, reply.id)
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
  );
};

export default ReplyToReplyForm;

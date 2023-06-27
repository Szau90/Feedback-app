import React, { useState } from "react";
import { Comments, Replies } from "@/models/feedback";
import MainBtn from "../Ui/buttons/MainBtn";
import ReplyInput from "../Ui/inputs/ReplyInput";
import { useAppDispatch } from "@/store/store";
import {
  sendReply,
  setReply,
  handleReplyToComment,
} from "@/store/commentsSlice";

const ReplyForm: React.FC<{
  feedbackId: number;
  commentId: number;
  comments: Comments[];
  userName: string;
}> = ({ feedbackId, commentId, comments, userName }) => {
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
        id: 998,
        image: "/assets/user-images/image-zena.jpg",
        name: "Zena Kelley",
        username: "velvetround",
      },
      showReply: false,
    };

    dispatch(handleReplyToComment({ comments, commentId }));
    dispatch(sendReply({ reply, feedbackId, commentId }));
    dispatch(setReply({ reply, commentId }));
    setEnteredReply("");
  };

  return (
    <form
      onSubmit={(event) => submitHandler(event, commentId, userName, comments)}
      className="mb-6 ml-[72px]  flex  flex-row gap-[16px]"
    >
      <ReplyInput
        onReplyChange={replyChangeHandler}
        enteredReply={enteredReply}
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

export default ReplyForm;

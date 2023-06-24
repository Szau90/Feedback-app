import { useState } from "react";
import { Comments } from "@/models/feedback";
import { addComment, sendComments } from "@/store/commentsSlice";
import CommentInput from "./Ui/inputs/CommentInput";
import { useAppDispatch } from "@/store/store";
import CommentActions from "./Ui/inputs/CommentActions";

const AddComment: React.FC<{
  id: number;
}> = ({ id }) => {
  const [enteredComment, setEnteredComment] = useState("");
  const [count, setCount] = useState(250);
  const dispatch = useAppDispatch();

  const comment: Comments = {
    id: Math.floor(Math.random() * 10000),
    content: enteredComment,
    user: {
      id: 998,
      image: "/assets/user-images/image-zena.jpg",
      name: "Zena Kelley",
      username: "velvetround",
    },
    replies: [],
    showReply: false,
  };

  const handleEnteredComment = (comment: string) => {
    setEnteredComment(comment);
  };

  const handleCounterChange = (counter: number) => {
    setCount(counter);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(sendComments({ feedbackId: id, comment: comment }));
    dispatch(addComment(comment));
    setEnteredComment("");
    setCount(250);
  };

  return (
    <>
      <div className="mb-[100px] mt-[24px] flex h-[234px] w-[327px] flex-col items-center justify-center rounded-[10px] bg-white md:h-[246px] md:w-[689px] md:pb-5 xl:w-[825px]">
        <h3 className="my-[24px] w-[279px] text-h3 text-custom-very-dark-gray md:w-[623px] xl:w-[759px]">
          Add comment
        </h3>
        <form onSubmit={submitHandler}>
          <CommentInput
            onContentChange={handleEnteredComment}
            comment={enteredComment}
            onCounterChange={handleCounterChange}
          />
          <CommentActions counter={count} />
        </form>
      </div>
    </>
  );
};

export default AddComment;

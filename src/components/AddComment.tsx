import { useState } from "react";
import MainBtn from "./Ui/buttons/MainBtn";
import { Comments, Replies } from "@/models/feedback";
import { useDispatch } from "react-redux";
import { addComment } from "@/store/commentsSlice";

const AddComment: React.FC<{
  id: number;
}> = ({ id }) => {
  const [count, setCount] = useState(250);
  const [enteredComment, setEnteredComment] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const initalValue = 250;
    const chars = event.target.value.length;
    const charsLeft = initalValue - chars;
    setCount(charsLeft);
    setEnteredComment(event.target.value);
  };

  const comment: Comments = {
    id: Math.floor(Math.random() * 10000),
    content: enteredComment,
    user: {
      image: "/assets/user-images/image-zena.jpg",
      name: "Zena Kelley",
      username: "velvetround",
    },
    replies: [],
    showReply: false,
  };

  const sendComment = async (comment: Comments, id: number) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updatedComment = await res.json();
      return updatedComment;
    } else {
      throw new Error("Reply could not be sent.");
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    sendComment(comment, id);
    dispatch(addComment(comment));
  };

  return (
    <>
      <div className="mb-[100px] mt-[24px] flex h-[234px] w-[327px] flex-col items-center justify-center rounded-[10px] bg-white md:h-[246px] md:w-[689px] md:pb-5 xl:w-[825px]">
        <h3 className="my-[24px] w-[279px] text-h3 text-custom-very-dark-gray md:w-[623px] xl:w-[759px]">
          Add comment
        </h3>
        <form onSubmit={submitHandler}>
          <textarea
            maxLength={250}
            placeholder="Type your comment here"
            className="h-[80px] w-[279px] resize-none bg-custom-very-light-gray p-3 text-body3 font-normal outline-none md:w-[623px] md:text-body2 xl:w-[759px]"
            onChange={changeHandler}
            value={enteredComment}
          />
          <div className="mt-[16px] flex w-[279px] items-center justify-between md:w-[623px] xl:w-[759px]">
            <p className="text-body3 font-normal text-custom-gray md:text-body2">
              {count} character left
            </p>
            <div className="w-[119px] md:w-[142px]">
              <MainBtn
                label="Post Comment"
                action={() => {}}
                background="bg-custom-purple"
                btnType="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddComment;

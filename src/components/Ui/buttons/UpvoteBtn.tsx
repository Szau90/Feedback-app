import { useState } from "react";
import { useAppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { User } from "@/models/feedback";
import { handleUpvote, setUpvotes } from "@/store/feedbackSlice";

const UpvoteBtn: React.FC<{
  isUpvoted: boolean;
  feedbackId: number;
  upvote: number;
}> = ({ isUpvoted, feedbackId, upvote }) => {
  const dispatch = useAppDispatch();

  const [isUpvoted1, setIsUpvoted] = useState(isUpvoted);

  const user = {
    id: 998,
    image: "/assets/user-images/image-zena.jpg",
    name: "Zena Kelley",
    username: "velvetround",
  };
  const icon = isUpvoted1
    ? "/assets/shared/icon-arrow-up-white.svg"
    : "/assets/shared/icon-arrow-up-blue.svg";

  const handleUpvoteClick = (user: User, feedbackId: number) => {
    dispatch(handleUpvote({ user, feedbackId }));
    dispatch(setUpvotes({ feedbackId, userId: user.id }));
    setIsUpvoted(!isUpvoted1);
  };

  return (
    <div
      className={`hidden ${
        isUpvoted1 ? "bg-custom-dark-blue" : "bg-custom-very-light-gray"
      } h-[32px] w-[69px] items-center justify-around rounded-[10px] md:flex md:h-[53px] md:w-[40px] md:flex-col`}
    >
      <button
        type="button"
        onClick={() => handleUpvoteClick(user, feedbackId)}
        className={`text-[13px] ${
          isUpvoted1 ? "text-white" : ""
        } flex flex-col items-center gap-2 font-bold tracking-[-0.18px]`}
      >
        <Image
          src={icon}
          width={10}
          height={7}
          alt="arrow up"
          style={{ objectFit: "contain" }}
        />
        {upvote}
      </button>
    </div>
  );
};

export default UpvoteBtn;

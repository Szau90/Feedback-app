import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import Image from "next/image";
import { User } from "@/models/feedback";
import { handleUpvote, setUpvotes } from "@/store/feedbackSlice";

const MobileUpvoteBtn: React.FC<{
  isUpvoted: boolean;
  feedbackId: number;
  upvote: number;
  hide: string;
}> = ({ isUpvoted, feedbackId, upvote, hide }) => {
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
    <button
      onClick={() => handleUpvoteClick(user, feedbackId)}
      className={`inline-flex h-[32px] w-[69px] items-center justify-around rounded-[10px] ${
        isUpvoted1 ? "bg-custom-dark-blue" : "bg-custom-very-light-gray"
      }  ${
        isUpvoted1 ? "text-white" : ""
      } text-[13px] font-bold tracking-[-0.18px] ${hide} `}
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
  );
};

export default MobileUpvoteBtn;

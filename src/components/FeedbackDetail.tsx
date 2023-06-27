import FeedbackList from "./Feedbacklist";
import FeedbackComments from "./FeedbackComments";
import { Comments } from "@/models/feedback";
import AddComment from "./AddComment";
import MainBtn from "./Ui/buttons/MainBtn";
import GoBackBtn from "./Ui/buttons/GoBackBtn";
import { useRouter } from "next/router";

export const FeedbackDetail: React.FC<{
  id: number;
  title: string;
  comments: Comments[];
  category: string;
  description: string;
  upvotes: number;
  status: string;
  isUpvoted: boolean;
}> = ({
  id,
  title,
  comments,
  category,
  description,
  upvotes,
  status,
  isUpvoted,
}) => {
  const router = useRouter();
  const editBtnHandler = () => {
    router.push(`/edit-feedback/${router.query.feedbackId}`);
  };
  const goBackHandler = () => {
    router.push("/");
  };

  return (
    <>
      <div className="mt-[24px] flex w-[327px] justify-between md:mt-[56px] md:w-[689px] xl:w-[825px]">
        <GoBackBtn
          label={"Go Back"}
          text="text-custom-gray"
          action={goBackHandler}
        />
        <div className="w-[119px] md:w-[142px]">
          <MainBtn
            label="Edit Feedback"
            action={editBtnHandler}
            background="bg-custom-dark-blue"
          />
        </div>
      </div>
    
      <FeedbackList
        id={id}
        title={title}
        comments={comments}
        category={category}
        description={description}
        upvotes={upvotes}
        status={status}
        isUpvoted={isUpvoted}
      />

      <FeedbackComments feedbackId={id} />
      <AddComment id={id} />
    </>
  );
};

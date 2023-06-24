import { Comments } from "@/models/feedback";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchFeedback } from "@/store/feedbackSlice";
import { useSelector } from "react-redux";
import UpvoteBtn from "./Ui/buttons/UpvoteBtn";
import Title from "./feedbackComponents/Title";
import Description from "./feedbackComponents/Description";
import Category from "./feedbackComponents/Category";
import MobileUpvoteBtn from "./Ui/buttons/MobileUpvoteBtn";
import CommentIcon from "./feedbackComponents/CommentIcon";

const FeedbackList: React.FC<{
  id: number;
  title: string;
  comments: Comments[];
  category: string;
  description: string;
  upvotes: number;
  status: string;
  isUpvoted: boolean;
}> = ({ id, title, comments, category, description, upvotes, isUpvoted }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch, upvotes]);

  const feedback = useSelector((state: RootState) => state.feedback.feedback);

  let upvote = upvotes;

  const feedbackItem = feedback.find((f) => f.id === id);

  const renderUpvotes = feedbackItem
    ? (upvote = feedbackItem.upvotes)
    : upvotes;

  return (
    <>
      <div className="mt-[20px] w-[327px]  xl:h-[151px] xl:w-[825px]">
        <div className=" box-border flex h-[200px] w-[327px] items-center justify-center rounded-lg border-0 bg-white md:h-[151px] md:w-[689px]  xl:w-[825px]">
          <div className="flex flex-col md:h-[95px] md:w-[625px] md:flex-row md:justify-between xl:w-[761px]">
            <UpvoteBtn
              isUpvoted={isUpvoted}
              feedbackId={id}
              upvote={renderUpvotes}
            />

            <div className="flex-col  md:w-[476px] xl:mr-[120px]">
              <Title title={title} mdWidth="md:w-max" xlWidth=""/>
              <Description description={description} mdWidth="md:w-max " xlWidth="" />
              <Category category={category}  />
            </div>
            <div className="mt-[9px] flex items-center justify-between">
              <MobileUpvoteBtn
                isUpvoted={isUpvoted}
                feedbackId={id}
                upvote={renderUpvotes}
                hide="md:hidden"
              />
              <CommentIcon comments={comments} id={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackList;

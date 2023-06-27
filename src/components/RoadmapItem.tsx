import { Comments } from "@/models/feedback";
import MobileUpvoteBtn from "./Ui/buttons/MobileUpvoteBtn";
import Title from "./feedbackComponents/Title";
import Description from "./feedbackComponents/Description";
import Category from "./feedbackComponents/Category";
import Status from "./feedbackComponents/Status";
import RoadmapItemWrapper from "./Ui/wrappers/RoadmapItemWrapper";
import CommentIcon from "./feedbackComponents/CommentIcon";
import { useEffect } from "react";
import { useAppDispatch, RootState } from "@/store/store";
import { fetchFeedback } from "@/store/feedbackSlice";
import { useSelector } from "react-redux";

const RoadmapItem: React.FC<{
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
      <RoadmapItemWrapper status={status}>
        <div>
          <Status status={status} />

          <Title title={title} mdWidth="md:w-[183px]" xlWidth="xl:w-[286px]" />
          <Description
            description={description}
            mdWidth="md:w-[183px]"
            xlWidth="xl:w-[286px]"
          />
          <Category category={category} />

          <div className="mt-[9px] flex items-center justify-between">
            <MobileUpvoteBtn
              upvote={renderUpvotes}
              isUpvoted={isUpvoted}
              feedbackId={id}
              hide=""
            />
            <CommentIcon id={id} comments={comments} />
          </div>
        </div>
      </RoadmapItemWrapper>
    </>
  );
};

export default RoadmapItem;

import { Comments } from "@/models/feedback";
import MobileUpvoteBtn from "./Ui/buttons/MobileUpvoteBtn";
import Title from "./feedbackComponents/Title";
import Description from "./feedbackComponents/Description";
import Category from "./feedbackComponents/Category";
import Status from "./feedbackComponents/Status";
import RoadmapItemWrapper from "./Ui/wrappers/RoadmapItemWrapper";
import CommentIcon from "./feedbackComponents/CommentIcon";

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
              upvote={upvotes}
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

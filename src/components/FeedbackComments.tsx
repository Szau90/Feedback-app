import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchComments } from "@/store/commentsSlice";
import {
  selectCommentsLength,
  selectRepliesLength,
} from "../store/commentSelector";
import { useAppDispatch } from "@/store/store";
import CommentList from "./CommentList";
import LoadingSpinner from "./Ui/LoadingSpinner";
import CommentsLength from "./CommentsLength";

const FeedbackComments: React.FC<{ feedbackId: number }> = ({ feedbackId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(feedbackId));
  }, [dispatch, feedbackId]);

  const status = useSelector((state: RootState) => state.comments.status);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const replyLength = useSelector(selectRepliesLength);
  const commentLength = useSelector(selectCommentsLength);

  const totalLength = replyLength + commentLength;
  
  const hasComment = Array.isArray(comments) && comments.length > 0;


  return (
    <>
      {status === "loading" && <LoadingSpinner />}
      <div className="mt-[24px] rounded-[10px] bg-white ">
        {status === "success" && hasComment && (
          <CommentsLength totalLength={totalLength} /> 
        )}
        {status === "success" && (
          <CommentList comments={comments} feedbackId={feedbackId} />
        )}
      </div>
    </>
  );
};

export default FeedbackComments;

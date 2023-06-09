import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchComments } from "@/store/commentsSlice";
import {
  selectCommentsLength,
  selectRepliesLength,
} from "../store/commentSelector";

import { useAppDispatch } from "@/store/store";
import CommentLista from "./Comments";

const CommentList: React.FC<{ feedbackId: number }> = ({ feedbackId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchComments(feedbackId));
  }, []);

  const status = useSelector((state: RootState) => state.comments.status);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const replyLength = useSelector(selectRepliesLength);
  const commentLength = useSelector(selectCommentsLength);




  let content;

  if (status === "loading") {
    content = <h1> Loading...</h1>;
  } else if (status === "success") {
    content = (
      <CommentLista
        comments={comments}
        feedbackId={feedbackId}
      />
    );
  }

  const totalLength = replyLength + commentLength;
  const hasComment = comments !== undefined && comments.length !== 0

  return (
    <ul className="mt-[24px] rounded-[10px] bg-white ">
      {status === "success" && hasComment && (
        <h3 className="my-[24px] ml-[24px] text-h3 text-custom-very-dark-gray">
          {totalLength} Comments
        </h3>
      )}
      {hasComment && content}
    </ul>
  );
};

export default CommentList;

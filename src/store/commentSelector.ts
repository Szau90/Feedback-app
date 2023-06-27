import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const selectComments = (state: RootState) => state.comments;

export const selectCommentsLength = createSelector(selectComments, (comments) =>
  comments.comments ? comments.comments.length : 0
);

export const selectRepliesLength = createSelector(
  selectComments,
  (comments) => {
    let replyLength = 0;

    if (comments.comments) {
      for (let i = 0; i < comments.comments.length; i++) {
        if (comments.comments[i].replies) {
          replyLength += comments.comments[i].replies.length;
        }
      }
    }

    return replyLength;
  }
);

import { Comments, Replies } from "@/models/feedback";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";

export interface CommentsState {
  comments: Comments[];
  status: string;
  error: string | undefined;
}

interface HandleReplyToComment {
  comments: Comments[];
  commentId: number;
}
interface HandleReplyToReply {
  commentId: number;
  replyId: number;
}

interface SetReplyPayload {
  reply: Replies;
  commentId: number;
}

interface sendReply {
  reply: Replies;
  feedbackId: number;
  commentId: number;
}
interface SendReplyToReply {
  reply: Replies;
  feedbackId: number;
  commentId:number;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle",
  error: "",
};
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (feedbackId: number, thunkApi) => {
    const response = await fetch(`/api/comments/${feedbackId}`);
    const data = await response.json();
    const comments = data.comments;

    return comments;
  }
);

export const sendReply = createAsyncThunk(
  "comments/sendReplies",
  async (payload: sendReply, thunkAPI) => {
    const { reply, feedbackId, commentId } = payload;
    const res = await fetch(`/api/replies/${feedbackId}/${commentId}`, {
      method: "POST",
      body: JSON.stringify(reply),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const updatedReply = await res.json();

      return updatedReply;
    } else {
      throw new Error("Reply could not be sent.");
    }
  }
);

export const sendReplyToReply = createAsyncThunk(
  "comments/sendReplyToReply",
  async (payload:SendReplyToReply, thunkAPI) => {
      const {reply, feedbackId, commentId} = payload;

      const res = await fetch(`/api/replies/${feedbackId}/${commentId}`, {
        method: "POST",
        body: JSON.stringify(reply),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const updatedReply = await res.json();

        return updatedReply;
      }else {
        throw new Error("Reply could not be sent.");
      }
  }
)

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comments[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comments>) => {
      state.comments.push(action.payload);
    },
    handleReplyToComment: (
      state,
      action: PayloadAction<HandleReplyToComment>
    ) => {
      const { comments, commentId } = action.payload;

      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            showReply: !comment.showReply,
          };
        }
        return comment;
      });

      state.comments = updatedComments;
    },
    handleReplyToReply: (state, action: PayloadAction<HandleReplyToReply>) => {
      const { replyId, commentId } = action.payload;

      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                showReply: !reply.showReply,
              };
            }
            return reply;
          });

          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });

      state.comments = updatedComments;
      
    },
    setReply: (state, action: PayloadAction<SetReplyPayload>) => {
      const { reply, commentId } = action.payload;

      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }
        return comment;
      });

      state.comments = updatedComments;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "success";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendReply.fulfilled, (state, action) => {
        const { reply, commentId } = action.payload;

        const updatedComments = state.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, reply],
            };
          }
          return comment;
        });

        state.comments = updatedComments;
      })
      .addCase(sendReplyToReply.fulfilled, (state, action)=> {
        const { replyId, commentId } = action.payload;

      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                showReply: !reply.showReply,
              };
            }
            return reply;
          });

          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });

      state.comments = updatedComments;
      })
      
  },
});

export const { setComments, addComment, setReply, handleReplyToComment, handleReplyToReply } =
  commentsSlice.actions;

export default commentsSlice.reducer;

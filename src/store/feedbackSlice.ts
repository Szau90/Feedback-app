import Feedback from "@/models/feedback";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  id: number;
}

export interface FeedbackState {
  feedback: Feedback[];
  status: string;
  error: string | undefined;
  category: string;
  Users: User[];
}

interface handleUpvotePayload {
  feedbackId: number;
  user: User;
}

interface EditFeedbackPayload {
  updatedFeedbackData: Feedback;
  id: number;
}

export const fetchFeedback = createAsyncThunk(
  "feedback/fetchfeedback",
  async (thunkAPI) => {
    try {
      const res = await fetch("/api/feedback");

      if (res.ok) {
        const feedback = res.json();
        return feedback;
      } else {
        throw new Error("Cannot find any feedback");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFeedback = createAsyncThunk(
  "feedback/addfeedback",
  async (payload: Feedback) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const newFeedback = await res.json();
        return newFeedback;
      } else {
        throw new Error("Feedback could not be sent.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const editFeedback = createAsyncThunk(
  "feedback/editFeedback",
  async (payload: EditFeedbackPayload) => {
    try {
      const { updatedFeedbackData, id } = payload;
      const res = await fetch(`/api/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedFeedbackData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        await res.json();
      } else {
        throw new Error("could not be update feedback.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id: number) => {
    try {
      const res = await fetch(`/api/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleUpvote = createAsyncThunk(
  "feedback/handleUpvote",
  async (payload: handleUpvotePayload) => {
    try {
      const { user, feedbackId } = payload;
      const res = await fetch(`/api/upvote/${feedbackId}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const updatedUpvote = await res.json();
        return updatedUpvote;
      } else {
        throw new Error("Upvote could not be sent.");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: FeedbackState = {
  feedback: [],
  status: "idle",
  error: "",
  category: "all",
  Users: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    filterFeedback: (state, action) => {
      state.category = action.payload;
    },
    setUpvotes: (state, action) => {
      const { feedbackId, userId } = action.payload;

      const updatedFeedback = state.feedback.map((feed) => {
        if (feed.id === feedbackId) {
          if (!feed.upvotedBy) {
            feed.upvotedBy = [];
          }

          if (!feed.upvotedBy.includes(userId)) {
            feed.upvotes += 1;
            feed.upvotedBy.push(userId);
            feed.isUpvoted = true;
          } else {
            feed.upvotes -= 1;
            feed.upvotedBy = feed.upvotedBy.filter((id) => id !== userId);
            feed.isUpvoted = false;
          }
        }

        return feed;
      });

      state.feedback = updatedFeedback;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "success";
        state.feedback = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      })
      .addCase(addFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.status = "success";
        state.feedback.push(action.payload);
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      });
  },
});

export const { filterFeedback, setUpvotes } = feedbackSlice.actions;

export default feedbackSlice.reducer;

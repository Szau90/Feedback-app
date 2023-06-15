import Feedback from "@/models/feedback"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface FeedbackState {
    feedback: Feedback[];
    status: string;
    error: string | undefined;
    category: string;
  }

  interface FilterFeedbackPayload {
    category: string;
  }

export const fetchFeedback = createAsyncThunk('feedback/fetchfeedback',
  async (thunkAPI) => {
    const res = await fetch("/api/feedback")

    if (res.ok){
        const feedback = res.json()
        return feedback
    }else {
        throw new Error ('Cannot find any feedback')
    }
  }
)  

export const addFeedback = createAsyncThunk('feedback/addfeedback',
async (payload: Feedback) => {
    const res = await fetch("/api/feedback", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (res.ok) {
       const newFeedback = await res.json()
       return newFeedback;
    }else {
    throw new Error ('Feedback could not be sent.')
    }
}
)

const initialState:FeedbackState = {
    feedback: [],
    status: 'idle',
    error: '',
    category: 'all',

}

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        filterFeedback: (state, action) => {
            state.category = action.payload
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchFeedback.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchFeedback.fulfilled, (state, action) => {
            state.status = 'success'
            state.feedback = action.payload
        })
        .addCase(fetchFeedback.rejected, (state, action)=> {
            state.status = "failed";
            state.error = action.error?.message;
        })
        .addCase(addFeedback.pending, (state) => {
                state.status = 'loading'
        })
        .addCase(addFeedback.fulfilled, (state, action) => {
                state.status = 'success'
                state.feedback.push(action.payload)
        })
        .addCase(addFeedback.rejected, (state, action)=> {
            state.status = "failed";
            state.error = action.error?.message;
        })
    }
})

export const {filterFeedback} = feedbackSlice.actions;

export default feedbackSlice.reducer;
import { configureStore, ThunkAction, Action,  } from "@reduxjs/toolkit";
import  commensReducer from "./commentsSlice"
import feedbackReducer from "./feedbackSlice"
import uiReducer from "@/store/uiSlice"
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        comments: commensReducer,
        feedback: feedbackReducer,
        ui: uiReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;


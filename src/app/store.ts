import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice/authSlice";
import  cs1Slice  from '@/pages/cs1Slice';
import MainSlice from '@/pages/MainSlice';
import finalSlice from './../pages/FinalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cs1: cs1Slice,
    rootData: MainSlice,
    finalData: finalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

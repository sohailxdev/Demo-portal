import { RootState } from "@/app/store"; 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CS1Item = {
  id: string;
  name: string;
  description?: string;
};

const initialState: CS1Item[] = [];

const cs1Slice = createSlice({
  name: "cs1", 
  initialState,
  reducers: {
    addCS1S(state, action: PayloadAction<CS1Item>) {
      return action.payload;
    },
  },
});

export const { addCS1S} = cs1Slice.actions;

export const selectCS1S = (state: RootState) => state.cs1;

export default cs1Slice.reducer;

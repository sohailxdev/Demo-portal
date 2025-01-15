import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  gr: number;
  wr: number;
};

const initialState: Item[] = [];

const finalSlice = createSlice({
  name: "finalData",
  initialState,
  reducers: {
    setCS1Data(state, action: PayloadAction<Item[]>) {
      return action.payload;
    },
  },
});

export const { setCS1Data } = finalSlice.actions;

// Selector to retrieve the data
export const selectCS1 = (state: RootState) => state.finalData;

export default finalSlice.reducer;

import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CS1Item = {
  code: string;
  description: string;
  wt: string;
  rmCost: string;
  wst: string;
  totalRmCost: string;
  cavity: string;
  cycleTime: string;
  qtyShift: string;
  labourCost: string;
  totalCost: string;
  spray: string;
  sprayCost: string;
  quantity: string;
  total: string;
};

const initialState: CS1Item[] = [
  {
    code: "ML445",
    description: "MLD 1Y FLY SW COVE",
    wt: "3.60",
    rmCost: "0.00",
    wst: "0.00",
    totalRmCost: "0.00",
    cavity: "8.00",
    cycleTime: "30.00",
    qtyShift: "0.00",
    labourCost: "0.00",
    totalCost: "1.37",
    spray: "0.90",
    sprayCost: "2.27",
    quantity: "144.00",
    total: "0.00",
  },
];

const MainSlice = createSlice({
  name: "rootData",
  initialState: initialState,
  reducers: {},
});

export const selectMain = (state: RootState) => state.rootData;

export default MainSlice.reducer;

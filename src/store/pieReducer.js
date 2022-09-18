import {
  createSlice
} from "@reduxjs/toolkit";


const pieSlice = createSlice({
  name: "pie",
  initialState: {
    pColorlist: ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56","#7b6888"]
  },
  reducers: {
    fetchColor: (state, action) => {
      state.pColorlist = action.payload
    }
  }
});

export const { fetchColor } = pieSlice.actions;

export default pieSlice.reducer

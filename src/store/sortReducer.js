import {
  createSlice
} from "@reduxjs/toolkit";


const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [9,10,4,3,5,7,6,8,15,20,13,14,11,19,17,18,16,12],
    start: false
  },
  reducers: {
    fetchData: (state, action) => {
      state.items = [...action.payload]
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setPivot: (state, action) => {
      state.pivot = action.payload;
    }
  }
});

export const { fetchData, setStart, setPivot } = itemSlice.actions;

export default itemSlice.reducer

import {
  createSlice
} from "@reduxjs/toolkit";


const graphSlice = createSlice({
  name: "graph",
  initialState: {
    glist: [],
    gstart: false,
    event: 'SINE'
  },
  reducers: {
    fetchGList: (state, action) => {
      state.glist = [...state.glist,action.payload]
    },
    setGStart: (state, action) => {
      state.gstart = action.payload;
    },
    resetGlist: (state, action) => {
      state.glist = []
    },
    setGEvent: (state, action) => {
      state.event = action.payload;
    },
  }
});

export const { fetchGList, setGStart, resetGlist, setGEvent } = graphSlice.actions;

export default graphSlice.reducer

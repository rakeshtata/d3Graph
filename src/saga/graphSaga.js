import { put, delay, select } from "redux-saga/effects";
import { fetchGList, resetGlist } from "../store/graphReducer";


const getStart = (state) => state.graph.gstart;
const getEvent = (state) => state.graph.event;

export function* graph(){
  let event = yield select(getEvent);

  for(let i=0;i < 30;){
    let start = yield select(getStart);
    if(start) {
      yield delay(5);
      if(event === "SINE") yield put(fetchGList({"x":i,"SINE":Math.sin(i)}));
      if(event === "COS") yield put(fetchGList({"x":i,"COS":Math.cos(i)}));
      if(event === "TAN") yield put(fetchGList({"x":i,"TAN":Math.tan(i)}));
      if(event === "SEC") yield put(fetchGList({"x":i,"SEC":1/Math.cos(i+20)}));
      if(event === "COT") yield put(fetchGList({"x":i,"COT": (1/Math.tan(i+20))}));
      if(event === "COS_SIN") yield put(fetchGList({"x":i,"SINE":Math.sin(i),"COS":Math.cos(i+20.4)}));
      if(event === "TAN_COT") yield put(fetchGList({"x":i,"TAN":Math.tan(i),"COT":1/Math.tan(i+40)}));
      i = i+0.1;
    } else {
      yield put(resetGlist());
      break;
    }
  }
}

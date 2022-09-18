import { put, delay } from "redux-saga/effects";
import { fetchColor } from "../store/pieReducer";

export function* pie(obj){
  let arr = obj.colors;
  for(let i=0;i < 30;){
      yield delay(10);
      arr.unshift(arr.pop());//arr.sort(() => Math.random() - 0.5);
      yield put(fetchColor([...arr]))
      i = i+0.1;
    }
  }

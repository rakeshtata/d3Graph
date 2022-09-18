import { put, delay, select } from "redux-saga/effects";
import { fetchData,setPivot } from "../store/sortReducer";
import constants from '../constants/AppConstants'


const getStart = (state) => state.item.start;

export function* bubbleSort(itemObj) {
  let items = itemObj.items;
  let swapped = false;
  for(let i =0; i< items.length -1 ;i++) {
    let start = yield select(getStart);
      if(start) {
        yield delay(500);
        yield put(fetchData(items));
        yield put(setPivot(i));
        for (let j = 0; j <  (items.length - i); j++) {
            //Compare the adjacent positions
            if (items[j] < items[j - 1]) {
                 swap(items,j,j-1);
                swapped= true;
            }
        }
        if(!swapped) break;
      } else {
        yield put(fetchData(constants.INIT_ITEM_LIST));
        break;
      }
    }
}

export function* insertionSort(itemObj) {
  let items = itemObj.items;
  for(let i =1; i< items.length+1 ;i++) {
    let start = yield select(getStart);
      if(start) {
        yield delay(500);
        yield put(fetchData(items));
        yield put(setPivot(i));
        let key = items[i];
        let j = i - 1;
        while (j >= 0 && items[j] > key) {
           items[j + 1] = items[j];
           j = j - 1;
       }
       items[j + 1] = key;
      } else {
        yield put(fetchData(constants.INIT_ITEM_LIST));
        break;
      }
    }
}

export function* selectionSort(itemObj) {
  let items = itemObj.items;
  let swapped = false;
  for(let i =0; i< items.length ;i++) {
    let start = yield select(getStart);
      if(start) {
        yield delay(500);
        yield put(fetchData(items));
        yield put(setPivot(i));
        let min = i;
        for (let j = i+1; j < items.length; j++) {
          if(items[j] < items[min]) {
               min = j;
           }
        }
        if(i !== min) {
           swap(items,i,min);
           swapped= true;
       }
       if(!swapped) break;
      } else {
        yield put(fetchData(constants.INIT_ITEM_LIST));
        break;
      }
    }
}


const swap = (items,i,j) => {
    var temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}

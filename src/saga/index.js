import { takeEvery } from "redux-saga/effects";
import {bubbleSort, insertionSort, selectionSort} from './sortSaga';
import {graph} from './graphSaga';
import {pie} from './pieSaga';

export default function* rootSaga() {
  yield takeEvery("BUBBLE_SORT", bubbleSort);
  yield takeEvery("INSERTION_SORT", insertionSort);
  yield takeEvery("SELECTION_SORT", selectionSort);
  yield takeEvery("GRAPH", graph);
  yield takeEvery("PIE", pie);
}

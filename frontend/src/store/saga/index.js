import {
  takeLatest,
  put,
  spawn,
  debounce,
  retry,
  take,
} from "redux-saga/effects";
import {
  changeSearchField,
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
} from "../slices/skillsSlice";

const searchSkills = async (search) => {
  const params = new URLSearchParams({ q: search });
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/search?${params}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const filterChangeSearchAction = ({ type, payload }) => {
  return type === changeSearchField.type && payload.trim() !== "";
};

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload));
}

function* handleSearchSkillsSaga(action) {
  try {
    const data = yield retry(3, 500, searchSkills, action.payload);
    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

function* watchChangeSearchSaga() {
  yield debounce(500, filterChangeSearchAction, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest.type, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}

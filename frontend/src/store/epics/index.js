import { ofType } from "redux-observable";
import {
  changeSearchField,
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
} from "../slices/skillsSlice";
import { of } from "rxjs";
import {
  map,
  tap,
  retry,
  filter,
  debounceTime,
  switchMap,
  catchError,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType(changeSearchField.type),
    map((o) => {
      return o.payload.trim();
    }),
    filter((o) => o !== ""),
    debounceTime(100),
    map((o) => searchSkillsRequest(o))
  );

export const searchSkillsEpic = (action$) =>
  action$.pipe(
    ofType(searchSkillsRequest.type),
    map((o) => o.payload),
    map((o) => new URLSearchParams({ q: o })),
    tap((o) => console.log(o)),
    switchMap((o) =>
      ajax.getJSON(`${process.env.REACT_APP_API_URL}/api/search?${o}`).pipe(
        retry(3),
        map((o) => searchSkillsSuccess(o)),
        catchError((e) => of(searchSkillsFailure(e)))
      )
    )
  );

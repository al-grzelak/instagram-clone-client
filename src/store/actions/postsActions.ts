import { Post } from "../../interfaces";
import { Dispatch } from "redux";
import Axios from "axios";
import { API_URL } from "../../../constants";

export interface FetchPostsRequest {
  type: PostsActionType.FETCH_POSTS_REQUEST;
}

export interface FetchPostsFailure {
  type: PostsActionType.FETCH_POSTS_FAILURE;
  payload: {
    error: Error;
  };
}
export interface FetchPostsSuccess {
  type: PostsActionType.FETCH_POSTS_SUCCESS;
  payload: {
    items: Post[];
  };
}

export type PostsAction =
  | FetchPostsRequest
  | FetchPostsFailure
  | FetchPostsSuccess;

export enum PostsActionType {
  FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST",
  FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE",
}

export function fetchPostsRequest() {
  return {
    type: PostsActionType.FETCH_POSTS_REQUEST,
  };
}

export function fetchPostsSuccess(posts: Post[]) {
  return {
    type: PostsActionType.FETCH_POSTS_SUCCESS,
    payload: {
      items: posts,
    },
  };
}

export function fetchPostsFailure(error: Error) {
  return {
    type: PostsActionType.FETCH_POSTS_FAILURE,
    payload: {
      error,
    },
  };
}

export function fetchPosts() {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(fetchPostsRequest());
    try {
      const { data: posts } = await Axios.get<Post[]>(API_URL);
      dispatch(fetchPostsSuccess(posts));
    } catch (e) {
      dispatch(fetchPostsFailure(e));
    }
  };
}

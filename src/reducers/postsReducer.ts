import { Dispatch } from "redux";
import postsService from "../services/postsService";
import { Post } from "../interfaces";

export enum PostsActionType {
  LOAD_POSTS = "LOAD_POSTS",
}

export type PostsState = Post[];

export interface LoadPostsAction {
  type: PostsActionType.LOAD_POSTS;
  payload: Post[];
}

export type PostsAction = LoadPostsAction;

export const initialState: PostsState = [];

function postsReducer(state = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case PostsActionType.LOAD_POSTS:
      return action.payload;
    default:
      return state;
  }
}

export function loadPosts() {
  return async (dispatch: Dispatch): Promise<void> => {
    const posts = await postsService.getAll();

    dispatch({
      type: PostsActionType.LOAD_POSTS,
      payload: posts,
    });
  };
}

export default postsReducer;

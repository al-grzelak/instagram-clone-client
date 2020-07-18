import { Post } from "../../interfaces";
import { PostsAction, PostsActionType } from "../actions/postsActions";

export interface PostsState {
  items: Post[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: PostsState = {
  items: [],
  isLoading: false,
  error: null,
};

function postsReducer(state = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case PostsActionType.FETCH_POSTS_REQUEST:
      return { ...state, isLoading: true };
    case PostsActionType.FETCH_POSTS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload.items };
    case PostsActionType.FETCH_POSTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}

export default postsReducer;

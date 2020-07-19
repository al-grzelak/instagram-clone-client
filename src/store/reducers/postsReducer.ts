import { Post } from "../../interfaces";
import { PostsAction, PostsActionType } from "../actions/postsActions";

export interface PostsState {
  data: Post[];
  loading: boolean;
  error: Error | null;
}

export const initialState: PostsState = {
  data: [],
  loading: false,
  error: null,
};

function postsReducer(state = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case PostsActionType.FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case PostsActionType.FETCH_POSTS_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    case PostsActionType.FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

export default postsReducer;

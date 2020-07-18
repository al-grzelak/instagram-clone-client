// import createMockStore, { MockStoreEnhanced } from "redux-mock-store";
// import thunk from "redux-thunk";
// import postsReducer, { PostsState } from "../reducers/postsReducer";
// import moxios from "moxios";
// import { fetchPosts, PostsActionType } from "../actions/postsActions";
//
// const middlewares = [thunk];
// const mockStore = createMockStore(middlewares);
//
// jest.mock("axios", () => {
//   return {
//     get: jest.fn(),
//   };
// });
//
// const initialState: PostsState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };
//
// describe("postsReducer", function () {
//   let store: MockStoreEnhanced<unknown, {}>;
//
//   beforeEach(() => {
//     moxios.install();
//     store = mockStore(initialState);
//   });
//
//   afterEach(() => {
//     moxios.uninstall();
//   });
//
//   it("should fetch all posts correctly", function () {
//     const posts = [
//       { photos: ["https://apple.com"], description: "Hello World" },
//       {
//         photos: ["https://wikipedia.org", "https://godoc.org"],
//         description: "Hello Vacuum",
//       },
//     ];
//
//     moxios.wait(() => {
//       let request = moxios.requests.mostRecent();
//       request.respondWith({
//         status: 200,
//         response: posts,
//       });
//
//       const expectedActions = [
//         { type: PostsActionType.FETCH_POSTS_REQUEST },
//         { type: PostsActionType.FETCH_POSTS_SUCCESS, payload: { posts } },
//       ];
//
//       return store.dispatch(fetchPosts());
//     });
//   });
// });

import postsReducer from "./postsReducer";

describe("postsReducer", function () {
  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  it("should handle the FETCH_POSTS_REQUEST action", function () {
    const action: any = {
      type: "FETCH_POSTS_REQUEST",
    };
    const expectedState = { ...initialState, isLoading: true };

    expect(postsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle the FETCH_POSTS_SUCCESS action", function () {
    const posts = [
      { photos: ["https://apple.com"], description: "Hello World" },
      {
        photos: ["https://wikipedia.org", "https://godoc.org"],
        description: "Hello Vacuum",
      },
    ];

    const action: any = {
      type: "FETCH_POSTS_SUCCESS",
      payload: {
        items: posts,
      },
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: null,
      items: posts,
    };

    expect(postsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle the FETCH_POSTS_FAILURE action", function () {
    const error = new Error("FAIL!");
    const action: any = {
      type: "FETCH_POSTS_FAILURE",
      payload: {
        error,
      },
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error,
    };

    expect(postsReducer(initialState, action)).toEqual(expectedState);
  });
});

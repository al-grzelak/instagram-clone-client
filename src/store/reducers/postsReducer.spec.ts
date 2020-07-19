import postsReducer from "./postsReducer";

describe("postsReducer", function () {
  const initialState = {
    data: [],
    loading: false,
    error: null,
  };

  it("should handle the FETCH_POSTS_REQUEST action", function () {
    const action: any = {
      type: "FETCH_POSTS_REQUEST",
    };
    const expectedState = { ...initialState, loading: true };

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
        data: posts,
      },
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
      data: posts,
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
      loading: false,
      error,
    };

    expect(postsReducer(initialState, action)).toEqual(expectedState);
  });
});

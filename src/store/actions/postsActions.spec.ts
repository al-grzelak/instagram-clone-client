import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchPosts } from "./postsActions";
import Axios from "axios";

jest.mock("Axios", () => {
  return {
    get: jest.fn(
      () => new Promise((resolve, reject) => resolve({ data: posts })),
    ),
  };
});

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const posts = [
  { photos: ["https://apple.com"], description: "Hello World" },
  {
    photos: ["https://wikipedia.org", "https://godoc.org"],
    description: "Hello Vacuum",
  },
];

describe("fetchPosts", function () {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should handle successful fetch", async function () {
    const expectedActions: any = [
      { type: "FETCH_POSTS_REQUEST" },
      { type: "FETCH_POSTS_SUCCESS", payload: { items: posts } },
    ];

    await store.dispatch(fetchPosts());
    expect(store.getActions()).toEqual(expectedActions);
    expect(Axios.get).toHaveBeenCalled();
  });

  it("should handle failed fetch", async function () {
    const error = new Error("FAILURE");
    const expectedActions: any = [
      { type: "FETCH_POSTS_REQUEST" },
      { type: "FETCH_POSTS_FAILURE", payload: { error } },
    ];
    (Axios.get as jest.MockedFunction<typeof Axios.get>).mockRejectedValue(
      error,
    );
    await store.dispatch(fetchPosts());
    expect(store.getActions()).toEqual(expectedActions);
    expect(Axios.get).toHaveBeenCalled();
  });
});

import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchPosts } from "./postsActions";
import moxios from "moxios";

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

const initialState = {
  data: [],
  loading: false,
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
    moxios.install();
    store = mockStore(initialState);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should handle successful fetch", async function () {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: posts });
    });
    const expectedActions: any = [
      { type: "FETCH_POSTS_REQUEST" },
      { type: "FETCH_POSTS_SUCCESS", payload: { data: posts } },
    ];

    await store.dispatch(fetchPosts());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should handle failed fetch", async function () {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({ status: 400 });
    });
    const error = new Error("Request failed with status code 400");
    const expectedActions: any = [
      { type: "FETCH_POSTS_REQUEST" },
      { type: "FETCH_POSTS_FAILURE", payload: { error } },
    ];

    await store.dispatch(fetchPosts());

    expect(store.getActions()).toEqual(expectedActions);
  });
});

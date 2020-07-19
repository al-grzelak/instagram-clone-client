import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/actions/postsActions";
import PostList from "./PostList";

function Posts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  });

  return (
    <div>
      <PostList />
    </div>
  );
}

export default Posts;

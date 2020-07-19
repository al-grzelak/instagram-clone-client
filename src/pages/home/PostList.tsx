import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PostItem from "../../components/PostItem";

function PostList() {
  const { data: posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>something went wrong... {error.message}</div>;

  return (
    <div>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;

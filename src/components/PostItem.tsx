import React from "react";
import { Post } from "../interfaces";
import PostPhotos from "./PostPhotos";

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  return (
    <div>
      {/*<PostHeader />*/}
      <PostPhotos photos={post.photos} />
      {/*<PostActions />*/}
      {/*<PostLikes />*/}
      {/*<PostComments />*/}
    </div>
  );
}

export default PostItem;

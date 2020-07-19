import React from "react";

interface Props {
  photos: string[];
}

function PostPhotos({ photos }: Props) {
  return (
    <div>
      <img src={photos[0]} alt="User's photo" />
    </div>
  );
}

export default PostPhotos;

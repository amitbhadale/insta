import React from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ userName, imageUrl, caption }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={userName}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{userName}</h3>
      </div>
      <img src={imageUrl} alt="post image" className="post__image" />
      <h4 className="post__text">
        <strong>{userName} : </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;

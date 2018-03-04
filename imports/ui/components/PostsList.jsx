import React, { Component } from 'react';

import Post from './Post.jsx';

export const PostsList = (props) => (
  <div>
    {/* List of Post Components would go here */}
    {props.posts.map((post) => (
      <Post key={post.id} onSave={props.onSave} onDelete={props.onDelete} data={post} />
    ))}
  </div>
);
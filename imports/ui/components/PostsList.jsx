import React, { Component } from 'react';

import Post from './Post.jsx';

export const PostsList = (props) => (
  <div>
    {props.posts.map((post) => (
      <Post key={post._id} onSave={props.onSave} onDelete={props.onDelete} data={post} />
    ))}
  </div>
);
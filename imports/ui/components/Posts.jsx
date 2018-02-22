import React, { Component } from 'react';

import Post from './Post.jsx';

export const Posts = (props) => (
  <div>
    List of Post Components would go here
    {props.posts.map((post) => (
      <Post data={post} />
    ))}
  </div>
);
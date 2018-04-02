import React, { Component } from 'react';

export const PostDisplay = (props) => (
  <div className="post-display-main" dangerouslySetInnerHTML={{__html: props.data}}></div>
);
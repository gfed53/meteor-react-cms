import React, { Component } from 'react';

export const PostDisplay = (props) => (
  <div class="post-display-main" dangerouslySetInnerHTML={{__html: props.data}}></div>
);
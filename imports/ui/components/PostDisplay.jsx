import React, { Component } from 'react';

export const PostDisplay = (props) => (
  <div dangerouslySetInnerHTML={{__html: props.data}}></div>
);
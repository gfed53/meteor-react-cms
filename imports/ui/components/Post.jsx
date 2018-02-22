import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';
import { PostDisplay } from './PostDisplay';

export default class Post extends Component {


  render() {
    return (
      <div>
        Individual Post Here
        <PostDisplay />
      </div>
    );
  }
}
import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of creating a new post from scratch. 
export default class PostCreate extends Component {


  render() {
    return (
      <div>
        New Post Section Here
        <MyEditor />
      </div>
    );
  }
}
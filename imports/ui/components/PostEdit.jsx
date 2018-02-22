import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of editing an existing post. Once editing, user can either save changes or cancel out.
export default class PostEdit extends Component {


  render() {
    return (
      <div>
        Edit Section Here
        <MyEditor />
      </div>
    );
  }

}
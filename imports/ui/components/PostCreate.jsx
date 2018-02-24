import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of creating a new post from scratch. 
export default class PostCreate extends Component {

  constructor(props){
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(draftContent){
    console.log('draftContent',draftContent);
  }


  render() {
    return (
      <div>
        New Post Section Here
        <MyEditor onSave={this.handleSave} />
      </div>
    );
  }
}
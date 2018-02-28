import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of editing an existing post. Once editing, user can either save changes or cancel out.
export default class PostEdit extends Component {

  constructor(props) {
    super(props);
  }

  handleSave(draft_content){
    console.log('draft_content',draft_content);
    
  }


  render() {
    return (
      <div>
        Now Editing...
        <MyEditor draft_content={this.props.draft_content} />
      </div>
    );
  }

}
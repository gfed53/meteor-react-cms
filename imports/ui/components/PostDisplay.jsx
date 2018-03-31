import React, { Component } from 'react';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';

export default class PostDisplay extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const content = convertFromRaw(this.props.draft_content);
    console.log('In PostDisplay');
    console.log('this.props.draft_content',this.props.draft_content);
    console.log('content',content);
    const existing_state = EditorState.createWithContent(content);
    console.log('existing_state',existing_state);

    return (
      <div className="post-display-main">
        <div className="post-display-main" dangerouslySetInnerHTML={{__html: this.props.data}}></div>
        {/* <Editor
        editorState={existing_state}
        // onChange={}
        readOnly={true}
        /> */}
      </div>
    );
  }
}
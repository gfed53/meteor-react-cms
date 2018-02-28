import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of editing an existing post. Once editing, user can either save changes or cancel out.
export default class PostEdit extends Component {

  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(draft_content){
    console.log('draft_content',draft_content);
    // Merge these properties with existing post in posts collection
    const postUpdates = {
      date_last_edited: new Date(),
      draft_content
    };

    console.log('postUpdates',postUpdates);
    console.log('this.props.post_id',this.props.post_id);

    this.props.onSave(this.props.post_id,postUpdates);
    
  }


  render() {
    return (
      <div>
        Now Editing...
        <MyEditor onSave={this.handleSave} draft_content={this.props.draft_content} />
      </div>
    );
  }

}
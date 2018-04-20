import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';

// Component in charge of creating a new post from scratch. 
export default class PostCreate extends Component {

  constructor(props){
    super(props);

    this.handleSave = this.handleSave.bind(this);
  }

  // For saving a new post
  handleSave(draftContent){

    // console.log('draftContent',draftContent);
    const post = {
      // Anon for now if user is not logged in.
      author: 'Anon',
      date_posted: new Date(),
      date_last_edited: new Date(),
      draft_content: draftContent
    }

    this.props.onSave(post);
  }

  render() {
    return (
      <div className="post-create-main">
        Create A New Post!
        <MyEditor onSave={this.handleSave} />
      </div>
    );
  }
}
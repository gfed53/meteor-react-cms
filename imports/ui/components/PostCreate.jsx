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
    const post = {
      // Anon for now, will probably pull username from Meteor backend using account system
      author: 'Anon',
      date_posted: new Date(),
      date_last_edited: new Date(),
      draft_content: draftContent
    }

    console.log('post in postCreate',post);

    this.props.onSave(post);
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
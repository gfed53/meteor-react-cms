import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';
import PostEdit from './PostEdit.jsx';
import { PostDisplay } from './PostDisplay';

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }

    this.onEdit = this.onEdit.bind(this);
  }

  // TODO: create an 'edit' button that reveals the PostEdit component, allowing user to update current post.
  onEdit(){
    this.setState({
      isEditing: true
    });
  }




  render() {
    const button = null;
    const postEdit = null;

    if(this.state.isEditing){
      postEdit = <PostEdit draft_content={this.props.data.draft_content} />;
    } else {
      button = <button onClick={this.onEdit}>Edit</button>;
    }

    return (
      <div>
        <p>By {this.props.data.author}</p>
        <p>Originally Posted: {this.props.data.date_posted.toLocaleString()}</p>
        <PostDisplay data={this.props.data.draft_content} />
        {postEdit}
        {button}
      </div>
    );
  }
}
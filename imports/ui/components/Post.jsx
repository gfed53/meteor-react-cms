import React, { Component } from 'react';

import MyEditor from './MyEditor.jsx';
import { PostDisplay } from './PostDisplay';

export default class Post extends Component {

  constructor(props) {
    super(props);
  }

  // TODO: create an 'edit' button that reveals the PostEdit component, allowing user to update current post.


  render() {
    return (
      <div>
        <p>By {this.props.data.author}</p>
        <p>Originally Posted: {this.props.data.date_posted.toLocaleString()}</p>
        <PostDisplay data={this.props.data.draft_content} />
      </div>
    );
  }
}
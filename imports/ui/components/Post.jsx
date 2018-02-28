import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

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

  getDraftHtml(raw){
    const content = convertFromRaw(raw);
    const options = {
      defaultBlockTag: 'div',
    };

    return stateToHTML(content, options);
  }




  render() {
    const button = null;
    const postEdit = null;
    const content = null;

    if(this.state.isEditing){
      content = <PostEdit post_id={this.props.data.id}  onSave={this.props.onSave} draft_content={this.props.data.draft_content} />;
    } else {
      content = (
        <div>
          <PostDisplay data={this.getDraftHtml(this.props.data.draft_content)} />
          <div className="post-button-edit-container">
            <button className="my-button" onClick={this.onEdit}>Edit</button>
          </div>
        </div>
      );
      // button = (<div className="post-button-edit-container">
      //             <button className="my-button" onClick={this.onEdit}>Edit</button>
      //           </div>);
    }

    return (
      <div className="post-main">
        <div className="post-meta right">
          <p>By {this.props.data.author}</p>
          <p>Originally Posted: {this.props.data.date_posted.toLocaleString()}</p>
        </div>

        {content}
        
        {/* <PostDisplay data={this.getDraftHtml(this.props.data.draft_content)} />
        {postEdit}
        {button} */}
        
      </div>
    );
  }
}
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

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this._handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleEdit(){
    this.setState({
      isEditing: true
    });
  }

  _handleDelete(){
    this.props.onDelete(this.props.data._id);
  }

  // Closes PostEdit. This will be passed into PostEdit component (and hopefully will work..)
  handleClose(){
    this.setState({
      isEditing: false
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
    const postButtons = this.props.data.owner && this.props.data.owner === Meteor.userId() ? (
      <div className="post-button-container">
        <button className="my-button" onClick={this.handleEdit}>Edit</button>
        <button className="my-button" onClick={this.handleDelete}>Delete</button>
      </div>
    ) : null;

    if(this.state.isEditing){
      content = <PostEdit post_id={this.props.data._id} onSave={this.props.onSave} onClose={this.handleClose} draft_content={this.props.data.draft_content} />;
    } else {
      content = (
        <div>
          <PostDisplay data={this.getDraftHtml(this.props.data.draft_content)} />
          
          {postButtons}
        </div>
      );
      // button = (<div className="post-button-edit-container">
      //             <button className="my-button" onClick={this.handleEdit}>Edit</button>
      //           </div>);
    }

    return (
      <div className="post-main">
        <div className="post-meta right">
          <p>By {this.props.data.author}</p>
          <p>Originally Posted: {this.props.data.date_posted.toLocaleString()}</p>
          <p>Last Edited: {this.props.data.date_last_edited.toLocaleString()}</p>
        </div>

        {content}
        
        {/* <PostDisplay data={this.getDraftHtml(this.props.data.draft_content)} />
        {postEdit}
        {button} */}
        
      </div>
    );
  }
}
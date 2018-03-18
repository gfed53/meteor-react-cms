import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import vex from 'vex-js';
import dialog from 'vex-dialog';
vex.registerPlugin(dialog);
vex.defaultOptions.className = 'vex-theme-os'

import { PostsList } from '../components/PostsList.jsx';
import PostCreate from '../components/PostCreate.jsx';

import { Posts } from '../../api/posts.js';

 
class Home extends Component {

	constructor(props) {
    super(props);

    this.handleNewPost = this._handleNewPost.bind(this);
    this.handleEditedPost = this._handleEditedPost.bind(this);
    this.handleDeletedPost = this._handleDeletedPost.bind(this);

  }

  componentDidMount(){
    
  }

  componentWillUpdate(){
  }

  componentDidUpdate(){
  }

  componentWillReceiveProps(nextProps) {
  }

  _handleNewPost(post){

    const draft_content = post.draft_content;

    Meteor.call('posts.insert', draft_content);
    Bert.alert( 'New post successfully created!', 'success', 'growl-bottom-right');
    
  }

  _handleEditedPost(post_id, draft_content){

    Meteor.call('posts.edit', post_id, draft_content);
    Bert.alert( 'Post successfully edited!', 'success', 'growl-bottom-right');

  }

  _handleDeletedPost(post_id){

    vex.dialog.confirm({
      message: 'Are you sure you want to delete this post?',
      callback: function (value) {
          if (value) {
              Meteor.call('posts.remove', post_id);
              Bert.alert( 'Post successfully deleted!', 'success', 'growl-bottom-right');
          } else {
              // Didnt delete.
          }
      }
    });
  }

  render() {
    return (
      <div>
        <PostCreate onSave={this.handleNewPost} />
        <PostsList onSave={this.handleEditedPost} onDelete={this.handleDeletedPost} posts={this.props.posts} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    // We can sort by date_posted or date_last_edited, sorting by date_posted for now.
    posts: Posts.find({}, {sort: {date_posted: -1} }).fetch(),
    currentUser: Meteor.user(),
  };
})(Home);
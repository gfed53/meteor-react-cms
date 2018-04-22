import React, { Component } from 'react';

import { CSSTransitionGroup } from 'react-transition-group';

import Post from './Post.jsx';


export default class PostsList extends Component {

  render(){
    const posts = this.props.posts.map((post) => (
      <Post key={post._id} onSave={this.props.onSave} onDelete={this.props.onDelete} data={post} />
    ));
  
    return (
      <div>
        <CSSTransitionGroup
          transitionName="fadeslide"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}>
          {posts}
        </CSSTransitionGroup>
      </div>
    );
  }
}
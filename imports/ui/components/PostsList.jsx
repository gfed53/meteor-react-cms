import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CSSTransitionGroup } from 'react-transition-group';

import Post from './Post.jsx';


class PostsList extends Component {

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

PostsList.propTypes = {
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  posts: PropTypes.arrayOf(PropTypes.object)
}

export default PostsList;
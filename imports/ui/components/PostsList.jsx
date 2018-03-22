import React, { Component } from 'react';

import { CSSTransitionGroup } from 'react-transition-group';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

// export const PostsList = (props) => {
//   const posts = props.posts.map((post) => (
//     <Post key={post._id} onSave={props.onSave} onDelete={props.onDelete} data={post} />
//   ));

//   return (
//     <div>
//       <CSSTransitionGroup
//         transitionName="example"
//         transitionEnterTimeout={500}
//         transitionLeaveTimeout={300}>
//         {posts}
//       </CSSTransitionGroup>
//     </div>
//   );
// }
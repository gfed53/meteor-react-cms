import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { PostsList } from '../components/PostsList.jsx';
import PostCreate from '../components/PostCreate.jsx';

import { Posts } from '../../api/posts.js';

 
class Home extends Component {

  

	constructor(props) {
    super(props);
    this.state = {
      // Mock data for now
      // postCount: 0
      // posts: [
      //   // {
      //   //   id: 1,
      //   //   author: 'Anon',
      //   //   date_posted: new Date('2018-01-01'),
      //   //   date_last_edited: null,
      //   //   draft_content: {}
      //   // }
      // ]
    }

    

    this.handleNewPost = this._handleNewPost.bind(this);
    this.handleEditedPost = this._handleEditedPost.bind(this);
    this.handleDeletedPost = this._handleDeletedPost.bind(this);

  }

  componentDidMount(){
    console.log('componentDidMount');
    console.log('this.props',this.props);
    // this.determinePostCount();
  }

  componentWillUpdate(){
    // console.log('componentWillUpdate');
    
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
    console.log('this.props',this.props);
    console.log('this.state',this.state);
  }

  componentWillReceiveProps(nextProps) {
    
  }

  detectUrlData(){
  }

  renderData(){
  }

  // May use this. Tenative for now
  // determinePostCount(){
  //   let _postCount = this.props.posts.length ? this.props.posts[0].id : 0;

  //   this.setState({
  //     postCount: _postCount
  //   });
  // }

  // _handleNewPost(post){
  //   const updatedPosts = [...this.state.posts];
  //   post.id = this.state.postCount+1;
  //   // this.setState({postCount: post.id});
    
  //   // console.log('post in Home',post);
  //   updatedPosts.unshift(post);
  //   this.setState({
  //     postCount: post.id,
  //     posts: updatedPosts
  //   });
    
  // }

  _handleNewPost(post){
    const draft_content = post.draft_content;
    console.log('draft_content',draft_content);
    
    Meteor.call('posts.insert', draft_content);
    
  }

  _handleEditedPost(post_id, draft_content){
    // console.log('handleEditedPost');
    console.log('post_id',post_id);
    console.log('draft_content',draft_content);

    // console.log('updates',updates);
    // const updatedPosts = [...this.state.posts];
    // console.log('updatedPosts',updatedPosts);

    // let post = updatedPosts[post_id-1];
    // let postIndex = updatedPosts.findIndex((item) => item.id === post_id);
    // console.log('postIndex',postIndex);
    // let post = updatedPosts[postIndex];
    // console.log('post',post);

    // Now we should have a reference to our existing post.

    // let updatedPost = Object.assign(post, updates);

    // console.log('updatedPost',updatedPost);

    // updatedPosts[postIndex] = updatedPost;

    // this.setState({
    //   posts: updatedPosts
    // });

    Meteor.call('posts.edit', post_id, draft_content);

  }

  _handleDeletedPost(post_id){
    console.log('we delete post',post_id);

    // const updatedPosts = [...this.state.posts];
    // let postIndex = updatedPosts.findIndex((item) => item.id === post_id);

    // updatedPosts.splice(postIndex,1);

    // this.setState({
    //   posts: updatedPosts
    // });

    Meteor.call('posts.remove', post_id);

  }

  render() {
    return (
      <div>
        {/* This is the homepage. */}
        
        <PostCreate onSave={this.handleNewPost} />
        <PostsList onSave={this.handleEditedPost} onDelete={this.handleDeletedPost} posts={this.props.posts} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');
  return {
    // We can sort by date_posted or date_last_edited, what should we do?
    posts: Posts.find({}, {sort: {date_posted: -1} }).fetch()
    // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    // currentUser: Meteor.user(),
  };
})(Home);
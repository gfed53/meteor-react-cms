import React, { Component } from 'react';

import { Posts } from '../components/Posts.jsx';
import PostCreate from '../components/PostCreate.jsx';

 
export default class Home extends Component {

  

	constructor(props) {
    super(props);
    this.state = {
      // Mock data for now
      postCount: 0,
      posts: [
        // {
        //   id: 1,
        //   author: 'Anon',
        //   date_posted: new Date('2018-01-01'),
        //   date_last_edited: null,
        //   draft_content: {}
        // }
      ]
    }

    this.handleNewPost = this._handleNewPost.bind(this);
    this.handleEditedPost = this._handleEditedPost.bind(this);
    this.handleDeletedPost = this._handleDeletedPost.bind(this);

  }

  componentDidMount(){
  }

  componentWillUpdate(){
    // console.log('componentWillUpdate');
    
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
    console.log('this.state.posts',this.state.posts);
  }

  componentWillReceiveProps(nextProps) {
    
  }

  detectUrlData(){
  }

  renderData(){
  }

  _handleNewPost(post){
    const updatedPosts = [...this.state.posts];
    post.id = this.state.postCount+1;
    // this.setState({postCount: post.id});
    
    // console.log('post in Home',post);
    updatedPosts.unshift(post);
    this.setState({
      postCount: post.id,
      posts: updatedPosts
    });
    
  }

  _handleEditedPost(post_id, updates){
    // console.log('handleEditedPost');
    // console.log('post_id',post_id);
    // console.log('updates',updates);
    const updatedPosts = [...this.state.posts];
    // console.log('updatedPosts',updatedPosts);

    // let post = updatedPosts[post_id-1];
    let postIndex = updatedPosts.findIndex((item) => item.id === post_id);
    // console.log('postIndex',postIndex);
    let post = updatedPosts[postIndex];
    // console.log('post',post);

    // Now we should have a reference to our existing post.

    let updatedPost = Object.assign(post, updates);

    // console.log('updatedPost',updatedPost);

    updatedPosts[postIndex] = updatedPost;

    this.setState({
      posts: updatedPosts
    });

  }

  _handleDeletedPost(post_id){
    console.log('we delete post',post_id);

    const updatedPosts = [...this.state.posts];
    let postIndex = updatedPosts.findIndex((item) => item.id === post_id);

    updatedPosts.splice(postIndex,1);

    this.setState({
      posts: updatedPosts
    });

  }

  render() {
    return (
      <div>
        {/* This is the homepage. */}
        
        <PostCreate onSave={this.handleNewPost} />
        <Posts onSave={this.handleEditedPost} onDelete={this.handleDeletedPost} posts={this.state.posts} />
      </div>
    );
  }
}
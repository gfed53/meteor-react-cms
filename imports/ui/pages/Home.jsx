import React, { Component } from 'react';

import { Posts } from '../components/Posts.jsx';
import PostCreate from '../components/PostCreate.jsx';

 
export default class Home extends Component {

  

	constructor(props) {
    super(props);
    this.state = {
      // Mock data for now
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

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleEditedPost = this.handleEditedPost.bind(this);

  }

  componentDidMount(){
  }

  componentWillUpdate(){
    // console.log('componentWillUpdate');
    
  }

  componentDidUpdate(){
    // console.log('componentDidUpdate');
    // console.log('this.state.posts',this.state.posts);
  }

  componentWillReceiveProps(nextProps) {
    
  }

  detectUrlData(){
  }

  renderData(){
  }

  handleNewPost(post){
    const updatedPosts = [...this.state.posts];
    post.id = updatedPosts.length+1;
    // console.log('post in Home',post);
    updatedPosts.unshift(post);
    this.setState({
      posts: updatedPosts
    });

    // setTimeout(() => {
    //   console.log('this.state.posts',this.state.posts);
    // }, 0);
    
  }

  handleEditedPost(post_id, updates){
    // console.log('handleEditedPost');
    // console.log('post_id',post_id);
    // console.log('updates',updates);
    const updatedPosts = [...this.state.posts];

    let post = updatedPosts[post_id-1];
    // console.log('post',post);

    // Now we should have a reference to our existing post.

    let updatedPost = Object.assign(post, updates);

    console.log('updatedPost',updatedPost);

    updatedPosts[post_id-1] = updatedPost;

    this.setState({
      posts: updatedPosts
    });

    console.log('this.state.posts',this.state.posts);



  }

  render() {
    return (
      <div>
        {/* This is the homepage. */}
        
        <PostCreate onSave={this.handleNewPost} />
        <Posts onSave={this.handleEditedPost} posts={this.state.posts} />
      </div>
    );
  }
}
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

    this.handleSave = this.handleSave.bind(this);

  }

  componentDidMount(){
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
    
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

  handleSave(post){
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

  render() {
    return (
      <div>
        {/* This is the homepage. */}
        
        <PostCreate onSave={this.handleSave} />
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}
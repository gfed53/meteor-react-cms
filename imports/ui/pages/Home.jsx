import React, { Component } from 'react';

import { Posts } from '../components/Posts.jsx';
import PostCreate from '../components/PostCreate.jsx';

 
export default class Home extends Component {

  

	constructor(props) {
    super(props);
    this.state = {
      // Mock data for now
      posts: [
        {
          id: 1,
          content: 'post 1'
        },
        {
          id: 2,
          content: 'post 2'
        },
        {
          id: 3,
          content: 'post 3'
        }
      ]
    }

  }

  componentDidMount(){
  }

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }

  componentWillReceiveProps(nextProps) {
    
  }

  detectUrlData(){
  }

  renderData(){
  }

  render() {
    return (
      <div>
        This is the homepage.
        <Posts posts={this.state.posts} />

        <PostCreate />
      </div>
    );
  }
}
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
          author: 'Anon',
          date_posted: new Date('2018-01-01'),
          date_last_edited: null,
          draft_content: {}
        },
        {
          id: 2,
          author: 'Anon',
          date_posted: new Date('2018-01-02'),
          date_last_edited: null,
          draft_content: {}
        },
        {
          id: 3,
          author: 'Anon',
          date_posted: new Date('2018-02-01'),
          date_last_edited: null,
          draft_content: {}
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
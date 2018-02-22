import React, { Component } from 'react';

import { Posts } from '../components/Posts.jsx';

 
export default class Home extends Component {

  

	constructor(props) {
    super(props);
    this.state = {
      // Mock data for now
      posts: [
        'post 1',
        'post 2',
        'post 3'
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
      </div>
    );
  }
}
import React, { Component } from 'react';

import Header from './components/Header.jsx';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      // Probably will be able to use Meteor method to detect user login.
      isLoggedIn: false
    }
  }

  render(){
    return(
      <div className="container" id="main-container">
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.props.content}
      </div>
    ); 
  }
}


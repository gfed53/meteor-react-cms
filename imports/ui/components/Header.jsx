import React, { Component } from 'react';

import { Nav } from './Nav.jsx';

export default class Header extends Component {
  
    constructor(props){
      super(props);
      // Probably will be able to use Meteor method to detect user login. For now, this lives in Header state and will be passed down to Nav.
      // The ultimate goal would be to have this state at the highest level component, but can we make the App component a class? 
      this.state = {
        isLoggedIn: false
      };
    }
  
  
    render() {
      return (
        <header>
          <Nav isLoggedIn={this.state.isLoggedIn} />
        </header>
      );
    }
  }
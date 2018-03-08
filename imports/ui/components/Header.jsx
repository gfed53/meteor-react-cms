import React, { Component } from 'react';

import { Nav } from './Nav.jsx';

export default class Header extends Component {
  
    constructor(props){
      super(props);
    }
  
  
    render() {
      return (
        <header>
          Header works.
          <Nav />
        </header>
      );
    }
  }
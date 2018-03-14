import React, { Component } from 'react';

import { Nav } from './Nav.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Header extends Component {
  
    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <header>
          <Nav />
        </header>
      );
    }
  }
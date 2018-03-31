import React, { Component } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export const Nav = (props) => {
  return (
    <div className="nav-container">
      <div className="credits">
        <span>Gregory Federico</span>
        <a href="https://github.com/gfed53/meteor-react-cms" target="_blank"><i className="fa fa-github"></i></a>
      </div>
      <div>
        <AccountsUIWrapper />
      </div>
    </div>
  );
};
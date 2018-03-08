import React, { Component } from 'react';

import { NavButton } from './NavButton.jsx';

export const Nav = (props) => (
  // For now, mock representation just showing state where user is not logged in.
  <div>
    <ul className="list-row">
      <li>
        <NavButton label="Log In" />
      </li>
      <li>
        <NavButton label="Create Account" />
      </li>
    </ul>
  </div>
);
import React, { Component } from 'react';

import Header from './components/Header.jsx';

export const App = (props) => (
  <div className="container" id="main-container">
    <Header />
    {props.content}
  </div>
);


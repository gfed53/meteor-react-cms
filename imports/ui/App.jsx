import React from 'react';

import Header from './components/Header.jsx';


export const App = ({content}) => (
  <div className="container" id="main-container">
  	<Header />
    {content}
  </div>
);
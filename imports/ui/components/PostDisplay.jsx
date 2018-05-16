import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const PostDisplay = (props) => (
  <div className="post-display-main" dangerouslySetInnerHTML={{__html: props.data}}></div>
);

PostDisplay.propTypes = {
  data: PropTypes.string
}
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'my-button my-style-button';
    if (this.props.active) {
      className += ' active';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
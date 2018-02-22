import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';


export default class MyEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};

    this.onChange = (editorState) => {
      // console.log('editorState',editorState);
      this.setState({editorState});
      const content = this.state.editorState.getCurrentContent();
      console.log('converted on change',convertToRaw(content));
    };

    this.logState = (editorState) => {
      const content = editorState.getCurrentContent();
      console.log('logState',convertToRaw(content));
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    this.logState(newState);

    if(newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
    // this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onTestClick() {
    console.log('currentContent',this.state.editorState.getCurrentContent());
  }



  render() {
    return (
      <div>
        <button onClick={this._onBoldClick}>Bold</button>
        <button onClick={this._onTestClick.bind(this)}>Test</button>
        <button onClick={this.logState}>Log State</button>
        <Editor 
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
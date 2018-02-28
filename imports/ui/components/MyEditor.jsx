import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';


export default class MyEditor extends Component {

  constructor(props) {
    super(props);

    /* This component may be passed existing content.
    If so, we use convertFromRaw(data) to get contentState, then use createWithContent(contentState), setting that to state.editorState.

    Else, we just use createEmpty().

    */
    this.state = {editorState: EditorState.createEmpty()};

    this.handleChange = (editorState) => {
      // console.log('editorState',editorState);
      this.setState({editorState});
      const content = this.state.editorState.getCurrentContent();
      // console.log('converted on change',convertToRaw(content));
    };

    this.logState = (editorState) => {
      const content = editorState.getCurrentContent();
      // console.log('logState',convertToRaw(content));
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    
    if (newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
    this.logState(newState);

    if(newState) {
      this.handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
    // this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onTestClick() {
    console.log('currentContent',this.state.editorState.getCurrentContent());
  }

  // Extracts content from editorState, then converts it to raw, more easily storable object, which is then passed up to Home component and saved within data model (in Home state for now)
  handleSave(){
    const content = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(content);

    this.props.onSave(raw);

    //Clear editorState afterwards (is there a better way?)
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }



  render() {
    return (
      <div className="my-editor-main">
        <div className="right controls-style">
          <button className="my-button" onClick={this._onBoldClick}>Bold</button>
        </div>
        {/* <button onClick={this._onTestClick.bind(this)}>Test</button> */}
        {/* <button onClick={this.logState}>Log State</button> */}
        <Editor 
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
        <div className="controls-main">
          <button className="my-button" onClick={this.handleSave}>Save</button>
          <button className="my-button">Cancel</button>
        </div>
      </div>
    );
  }
}
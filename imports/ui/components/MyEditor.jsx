import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';


import { InlineStyleControls } from './InlineStyleControls.jsx';
import { BlockStyleControls } from './BlockStyleControls.jsx';

import createLinkifyPlugin from 'draft-js-linkify-plugin';

import linkifyEditorState from './linkifyEditorState.js';


const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'
}
);

export default class MyEditor extends Component {

  constructor(props) {
    super(props);

    /*-----------------------------------------------------------
      This component may be passed existing content.
      If so, we use convertFromRaw(data) to get contentState, then use createWithContent(contentState), setting that to state.editorState.

      Else, we just use createEmpty().
    */
    this.state = {editorState: EditorState.createEmpty()};


    this.editorStateInput = null;

    this.setEditorStateInputRef = element => {
      this.editorStateInput = element;
    }

    this.handleChange = (editorState) => {
      this.setState({editorState});
      const content = this.state.editorState.getCurrentContent();
    };

    this.logState = (editorState) => {
      const content = editorState.getCurrentContent();
    };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onBoldClick = this._onBoldClick.bind(this);
    this.handleSave = this._handleSave.bind(this);

    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

  }

  componentDidMount(){
    if(this.props.draft_content){
      const content = convertFromRaw(this.props.draft_content);
      const existing_state = EditorState.createWithContent(content);

      this.setState({
        editorState: EditorState.createWithContent(content)
      });

    }

    if(this.props.shouldAutofocus){
      this.editorStateInput.focus();
    }
  }

  componentWillReceiveProps(nextProps){
  }

  _handleKeyCommand(command, editorState) {
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
  }

  _toggleBlockType(blockType) {
    this.handleChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  // Extracts content from editorState, then converts it to raw, more easily storable object, which is then passed up to Home component and saved within data model (in Home state for now)
  _handleSave(){
    const content = this.state.editorState.getCurrentContent();

    const linkifiedEditorState = linkifyEditorState(this.state.editorState);

    const linkifiedContent = linkifiedEditorState.getCurrentContent();

    const raw = convertToRaw(linkifiedContent);

    this.props.onSave(raw);

    // Clear editorState afterwards (is there a better way?)
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }

  render() {
    const {editorState} = this.state;
    const controls = null;

    if(this.props.draft_content){
      controls = (
        <div className="controls-main">
          <button className="my-button" onClick={this.handleSave}>Save</button>
          <button className="my-button" onClick={this.props.onCancel}>Cancel</button>
        </div>
      );
    } else {
      controls = (
        <div className="controls-main">
          <button className="my-button" onClick={this.handleSave}>Create</button>
        </div>
      )
    }
    return (
      <div className="my-editor-main">
      <div className="container-controls">
        <div className="controls-style">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        </div>
        <div className="controls-style">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
      </div>
        <Editor 
          ref={this.setEditorStateInputRef}
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
          plugins={[linkifyPlugin]}
        />
        {controls}
      </div>
    );
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, SelectionState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';


import { InlineStyleControls } from './InlineStyleControls.jsx';
import { BlockStyleControls } from './BlockStyleControls.jsx';

import createLinkifyPlugin from 'draft-js-linkify-plugin';

import linkifyEditorState from './linkifyEditorState.js';


const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'
}
);

// Actual tab
// const tabCharacter = '	';

// Spaces
const tabCharacter = '    ';
const keyMap = {};

export default class MyEditor extends Component {

  constructor(props) {
    super(props);

    /*-----------------------------------------------------------
      This component may be passed existing content.
      If so, we use convertFromRaw(data) to get contentState, then use createWithContent(contentState), setting that to state.editorState.

      Else, we just use createEmpty().
    */
    this.state = {
      editorState: EditorState.createEmpty()
    };


    this.editorStateInput;

    this.setEditorStateInputRef = (element) => {
      this.editorStateInput = element;
    }

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onChange = this._onChange.bind(this);
    this.onTab = this._onTab.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.handleSave = this._handleSave.bind(this);

  }

  componentDidMount(){

    if(this.props.draft_content){

      const content = convertFromRaw(this.props.draft_content);
      const existing_state = EditorState.createWithContent(content);

      const state_with_cursor_at_end = moveSelectionToEnd(existing_state);

      this.setState({
        editorState: state_with_cursor_at_end
      });

    }

    // Wait a tick, or else draft content won't render in view
    setTimeout(() => {this.editorStateInput.focus()}, 0);
    
  }

  componentWillReceiveProps(nextProps){
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onChange(editorState){
    this.setState({editorState});
  }

  _onTab(e) {
    if(keyMap[39]){
      e.preventDefault();

      let currentState = this.state.editorState;
      let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        tabCharacter
      );
  
      this.setState({ 
        editorState: EditorState.push(currentState, newContentState, 'insert-characters')
      });
    } else {
      // For nested lists
      this.onChange(RichUtils.onTab(e, this.state.editorState, 6));
    }
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
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
          onChange={this.onChange}
          onTab={this.onTab}
          plugins={[linkifyPlugin]}
        />
        {controls}
      </div>
    );
  }
}


/*-----------------------------------------------------------
  Enable tabbing within editor when the user holds down right arrow.
  Tabs don't actually get saved within editor state. Spaces do, though.
  TODO: find a key that wouldn't conflict. This does if there's existing text to the right of the current line. Maybe ALT+SHIFT+TAB
  Or, maybe instead find a way to create a tab when user types out a special string, like '\tab'.
*/
document.addEventListener('keydown', function(e) {
  if(e.which === 39){
    keyMap[e.which] = true;
  }
});

document.addEventListener('keyup', function(e) {
  if(e.which === 39){
    keyMap[e.which] = false;
  }
});

function moveSelectionToEnd(editorState) {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  });

  return EditorState.acceptSelection(editorState, selection);
};

MyEditor.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  draft_content: PropTypes.object
}
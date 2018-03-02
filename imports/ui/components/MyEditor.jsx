import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

import { InlineStyleControls } from './InlineStyleControls.jsx';
import { BlockStyleControls } from './BlockStyleControls.jsx';


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

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.onBoldClick = this._onBoldClick.bind(this);
    this.handleSave = this._handleSave.bind(this);

    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

  }

  componentDidMount(){
    if(this.props.draft_content){
      // console.log('draft_content',this.props.draft_content);
      const content = convertFromRaw(this.props.draft_content);
      // console.log('content',content);
      const existing_state = EditorState.createWithContent(content);
      // console.log('existing_state',existing_state);

      this.setState({
        editorState: EditorState.createWithContent(content)
      });

    }
  }

  componentWillReceiveProps(nextProps){
    // console.log('running?');
    // if(nextProps.draft_content){
    //   const content = convertFromRaw(draft_content);
    //   console.log('content',content);
    // }
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
    // this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
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

  _onTestClick() {
    console.log('currentContent',this.state.editorState.getCurrentContent());
  }

  // Extracts content from editorState, then converts it to raw, more easily storable object, which is then passed up to Home component and saved within data model (in Home state for now)
  _handleSave(){
    const content = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(content);

    this.props.onSave(raw);

    //Clear editorState afterwards (is there a better way?)
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
          <button className="my-button">Cancel</button>
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
        <div className="left controls-style">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        </div>
        <div className="right controls-style">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
      </div>
        <Editor 
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.handleChange}
        />
        {controls}
        {/* <div className="controls-main">
          <button className="my-button" onClick={this.handleSave}>Save</button>
          <button className="my-button">Cancel</button>
        </div> */}
      </div>
    );
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MyEditor from './MyEditor.jsx';

// Component in charge of editing an existing post. Once editing, user can either save changes or cancel out.
class PostEdit extends Component {

  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this._handleCancel.bind(this);
  }

  handleSave(draft_content){

    this.props.onSave(this.props.post_id, draft_content);
    this.props.onClose();
    
  }

  _handleCancel(){
    this.props.onClose();
  }


  render() {
    return (
      <div>
        Now Editing...
        <MyEditor onSave={this.handleSave} onCancel={this.handleCancel} draft_content={this.props.draft_content} />
      </div>
    );
  }

}

PostEdit.propTypes = {
  post_id: PropTypes.number,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  draft_content: PropTypes.object
}

export default PostEdit;
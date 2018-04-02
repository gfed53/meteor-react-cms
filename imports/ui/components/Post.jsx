import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import MyEditor from './MyEditor.jsx';
import PostEdit from './PostEdit.jsx';
import { PostDisplay } from './PostDisplay';

export default class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }

    this.handleEdit = this._handleEdit.bind(this);
    this.handleDelete = this._handleDelete.bind(this);
    this.handleClose = this._handleClose.bind(this);
    
  }

  _handleEdit(){
    this.setState({
      isEditing: true
    });
  }

  _handleDelete(){
    this.props.onDelete(this.props.data._id);
  }

  _handleClose(){
    this.setState({
      isEditing: false
    });
  }

  getDraftHtml(raw){
    const content = convertFromRaw(raw),
          options = {
            defaultBlockTag: 'div',
            // Convert link entities to have 'http://'-prefixed links, with 
            entityStyleFn: (entity) => {
              const entityType = entity.get('type').toLowerCase();
              if (entityType === 'link') {
                const data = entity.getData();
                return {
                  element: 'a',
                  attributes: {
                    target: '_blank',
                    href: convertToValidLink(data.url),
                  },
                  style: {
                    // Put styles here...
                  },
                };
              }
            },
          };

    return stateToHTML(content, options);
  }

  render() {
    const button = null,
          postEdit = null,
          content = null,
          postButtons = (this.props.data.owner && 
                        this.props.data.owner === Meteor.userId()) ||
                        Roles.userIsInRole(Meteor.userId(), ['admin']) // Unlimited power!!
                         ? (
            <div className="post-button-container">
              <button className="my-button" onClick={this.handleEdit}>Edit</button>
              <button className="my-button" onClick={this.handleDelete}>Delete</button>
            </div>
          ) : null;

    if(this.state.isEditing){
      content = 
      <PostEdit 
      post_id={this.props.data._id} 
      onSave={this.props.onSave} 
      onClose={this.handleClose} 
      draft_content={this.props.data.draft_content} />;
    } else {
      content = (
        <div>
          <PostDisplay 
          data={this.getDraftHtml(this.props.data.draft_content)}
          />     
          {postButtons}
        </div>
      );
    }

    return (
      <div className="post-main">
        <div className="post-meta right">
          <p>By {this.props.data.author}</p>
          <p>Originally Posted: {this.props.data.date_posted.toLocaleString()}</p>
          <p>Last Edited: {this.props.data.date_last_edited.toLocaleString()}</p>
        </div>
        {content}
      </div>
    );
  }
}

// Won't have to worry about deeper validation like 'www.' and suffixes since linkify plugin takes care of that for us initially.
function convertToValidLink(link){
  let httpRegex = /^https*:\/\/.+/g;
  
  return !httpRegex.test(link) ? 
  `http://${link}` :
  link;
  
}
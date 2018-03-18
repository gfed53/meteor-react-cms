//jshint esversion: 6

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

// This is needed after removing autopublish package
if(Meteor.isServer){
  Meteor.publish('tasks', function postsPublication() {
    return Posts.find();
  });	
}

Meteor.methods({
  'posts.insert'(draft_content) {
 
    Posts.insert({
      draft_content,
      date_posted: new Date(),
      date_last_edited: new Date(),
      owner: Meteor.user() ? Meteor.userId() : null,
      author: Meteor.user() ? Meteor.user().username : 'Anon',
    });
  },
  'posts.remove'(postId) {
    check(postId, String);

    const post = Posts.findOne(postId);
 
    Posts.remove(postId);
  },
  'posts.edit'(postId, draft_content) {
    check(postId, String);
 
    Posts.update(postId, { $set: { draft_content, date_last_edited: new Date() } });
  },
});




//jshint esversion: 6

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

// Not sure if we need this, but we'll have to keep track of post id somehow.
// Probably can't determine post id based on what saved posts we have. If we, for example, delete the most recent post, then after creating a new post, it will be labelled with the same id as the one we just deleted.
// If we delete the 2nd out of 3 posts, hmmm, maybe we can just take the id of the most recent post and use that as a reference. If that's a problem, we can just create a separate collection that just takes a number prop, representing our post count.
// Or, maybe if we end up using Mongo's ids, it won't be something we really have to worry about.

// export const PostsCount = new Mongo.Collection('post-count');

// This is needed after removing autopublish package
if(Meteor.isServer){
  Meteor.publish('tasks', function postsPublication() {
    return Posts.find();
  });	
}

Meteor.methods({
  'posts.insert'(draft_content) {
    // check(text, String);
 
    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Posts.insert({
      draft_content,
      date_posted: new Date(),
      date_last_edited: new Date(),
      author: 'Anon',
    });
  },
  'posts.remove'(postId) {
    check(postId, String);

    const post = Posts.findOne(postId);
    // if (task.owner !== Meteor.userId()) {
    //   // If the task is private (or public), make sure only the owner can delete it
    //   throw new Meteor.Error('not-authorized');
    // }

    // if (task.private && task.owner !== Meteor.userId()) {
    //   // If the task is private, make sure only the owner can delete it
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Posts.remove(postId);
  },
  'posts.edit'(postId, draft_content) {
    check(postId, String);

    // const post = Posts.findOne(postId);

    // if (task.owner !== Meteor.userId()) {
    //   // If the task is private (or public), make sure only the owner can check it off
    //   throw new Meteor.Error('not-authorized');
    // }
 
    Posts.update(postId, { $set: { draft_content, date_last_edited: new Date() } });
  },
});




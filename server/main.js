import { Meteor } from 'meteor/meteor';
import '../imports/api/posts.js';

Meteor.startup(() => {
  // code to run on server at startup
  // console.log('Meteor.settings',Meteor.settings);
  // console.log('MONGO_URL',process.env.MONGO_URL);
});

import { Meteor } from 'meteor/meteor';
import '../imports/api/posts.js';

Meteor.startup(() => {
  // code to run on server at startup
  // console.log('Meteor.settings',Meteor.settings);
  // console.log('MONGO_URL',process.env.MONGO_URL);

  //----------- Configure mLab
  // process.env.MONGO_URL = 'mongodb://gfed123:flob1357@ds215019.mlab.com:15019/cheesy-white-cms';

  console.log('Meteor.settings',Meteor.settings);
  console.log('MONGO_URL',process.env.MONGO_URL);
});

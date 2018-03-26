import { Meteor } from 'meteor/meteor';
import '../imports/api/posts.js';

Meteor.startup(() => {
  // code to run on server at startup

  // Give this user the 'admin' role
  Roles.addUsersToRoles('WrtgdqtD659WbBzfy', 'admin', Roles.GLOBAL_GROUP);

  /*-----------------------------------------------------------
    Admins are allowed to edit and delete any post within the app.
    'WrtgdqtD659WbBzfy' is just a test admin's ID for my local repo's database. If you're 
    creating your own local build of this app, you'd replace this string with whatever user ID you'd want to give admin privileges to.   
  */

});

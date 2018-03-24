# Rich Text Post Feed

## Overview

A simple post feed and rich text-based content management system built with [ReactJS](https://reactjs.org/), [Draft.js](https://draftjs.org/), and [Meteor](https://www.meteor.com/).

There's a live version deployed through Heroku (though there may be future updates!). Check it out [here](http://gregs-cms-123.herokuapp.com/home)!

## What It Does

This app allows you to create posts using rich-text, such as bold, italics, underline as well as headers, lists, etc. When you open the app, you'll see a post feed displaying all posts created by you or anyone else, sorted by post-date in descending order. Since this is a simple implementation created mainly to explore technologies and boost my skills, it's actually more like a Facebook newsfeed than a typical blogging CMS like WordPress.

You can create an account before making posts, where you'd have the ability to edit and delete your own posts whenever. I currently have the app designed so that people can also create posts without logging in, though their posts will be labeled as anonymous and they can't edit or delete posts.. but this might change in the future.

## Inspiration

This app was created to help me gain more experience with Meteor, ReactJS, and DraftJS. I started messing with this idea while previously working as an intern at a marketing agency. There was a possibility that the team and I would be asked to integrate some CMS-like features into an internal tool for the company, and due to our mutual hesitation of using WordPress, we looked into other options. Although we didn't end up building this out, I wanted to build something of my own that, even on a smaller scale, mirrored what we planned to do.

Earlier dabblings of this (among other parts of the potential project) can be seen in my [react-multi](https://github.com/gfed53/react-multi) repo.

## Setup

* Meteor, Node.js, and npm must be installed locally. 
  * [Node/npm instructions](https://www.npmjs.com/get-npm)
  * [Meteor instructions](https://www.meteor.com/install)

* Once you've cloned the repo, in the terminal navigate to the root of the project by entering `cd ~/PATH_TO/meteor-react-cms`, and run `meteor npm i` to install the node dependencies.

* You can now run the app at localhost:3000 by entering `npm start` in the terminal while in the root directory.


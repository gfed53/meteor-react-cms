import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

// All Layouts and Pages
import App from '../ui/App.jsx';
import Home from '../ui/pages/Home.jsx';


FlowRouter.route('/home', {
  action(params) {
    mount(App, {
      content: <Home />
    });
  }
});

FlowRouter.notFound = {
	action: function(){
		FlowRouter.go('/home');
	}
}


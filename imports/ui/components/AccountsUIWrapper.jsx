import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import $ from 'jquery';
 
export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(
      Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));

    // Fix for tab accessibility
    setTimeout(() => {
      console.log(document.querySelectorAll('.login-link-text'));
      let linkEls = document.querySelectorAll('.login-link-text');

      linkEls.forEach((el) => {
        console.log('el',el);
        el.setAttribute('href','');
        el.setAttribute('tabIndex',0);
      });

      // Focus test
      $('.login-link-text').on('click', function(e) {
        console.log('clicked login-link-text');
      })

      // Init keyboard trap




    },1000);

  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}


// Function for keyboard trap down here?
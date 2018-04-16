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

      setDropDownLinkAccessible();

      function setDropDownLinkAccessible() {

        setTimeout(() => {
          $('.login-link-and-dropdown-list a').attr({
            href: '',
            tabIndex: 0
          });
        }, 500);
      }
      

      // Focus
      $('.nav-container').on('click', '.login-link-text', function(e) {

        handleDropdown();

        function handleDropdown(){
          setTimeout(() => { 
            let $accountsDialog = $('.login-link-and-dropdown-list .accounts-dialog');

            if($accountsDialog.length){
  
              // Make these children tab-accessible
              $accountsDialog.find('.login-button, a').attr({
                href: '',
                tabIndex: 0
              });
              
              // Allow 'enter' key to trigger what mouse click would trigger
              $accountsDialog.find('.login-button, input, a').on('keydown', function(e) {
                if(e.which === 13){
                  $(this).trigger('click');

                  // recursive
                  handleDropdown();
                  setDropDownLinkAccessible();
                }
              })

              $('.login-close-text').focus();

              setFocusBoundary($('.login-link-and-dropdown-list .accounts-dialog'), () => {
                setDropDownLinkAccessible();
              });
          }

          },0);

        }
      });





    },500);

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


// Function for keyboard trap down here

function setFocusBoundary(parentEl, onRevert) {
  let element = parentEl[0],
  focusableEls = element.querySelectorAll('a[href], area[href], div, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

  parentEl.on('keydown', (e) => {
    handleKeyDown(focusableEls, e, onRevert);
  });
}

function handleKeyDown(focusableEls, e, closeCB) {
  
  let KEY_TAB = 9,
      KEY_ESC = 27,
      firstFocusableEl = focusableEls[0],
      lastFocusableEl = focusableEls[focusableEls.length - 1];

  function handleBackwardTab() {
    if ( document.activeElement === firstFocusableEl ) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  }
  function handleForwardTab() {
    if ( document.activeElement === lastFocusableEl ) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  }

  switch(e.keyCode) {
    case KEY_TAB:
      if ( focusableEls.length === 1 ) {
        e.preventDefault();
        break;
      } 

      if ( e.shiftKey ) {
        handleBackwardTab();
      } else {
        handleForwardTab();
      }
    
      break;

    case KEY_ESC:
      closeCB();
      break;
      
    default:
      break;
  } // end switch
}
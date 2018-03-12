import React, { Component } from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { NavButton } from './NavButton.jsx';

export const Nav = (props) => {
  // For now, mock representation just showing state where user is (or isn't) logged in.
  return (
    <div className="nav-container">
      <AccountsUIWrapper />
    </div>
  );
};

// export const Nav = (props) => {
//   // For now, mock representation just showing state where user is (or isn't) logged in.
//   return props.isLoggedIn ? (
//     <div className="header-logged-in">
//       <ul className="list-row list-row-logged-in">
//         <li>
//           <span class="nav-user-greeting">Welcome Test User!</span>
//         </li>
//         <li>
//           <NavButton label="Log Out" />
//         </li>
//       </ul>

//     </div>
//   ) :
//   (
//     <div className="header-not-logged-in">
//     <ul className="list-row">
//       <li>
//         <NavButton label="Log In" />
//       </li>
//       <li>
//         <NavButton label="Create Account" />
//       </li>
//     </ul>
//   </div>
//   )
// };
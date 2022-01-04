import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../../images/bruin-exchange-logo.png';

const Navbar = ({ auth }) => {
  const [hideMenu, setMenu] = useState(true);
  const location = useLocation();

  return (
    <nav class="font-main flex items-center justify-between flex-wrap p-6">
      <Link to="/">
        <div class="flex items-center flex-shrink-0 mr-8">
          <img className="h-20" src={logo} alt="bruin exchange logo"></img>
          {/* <span class="font-bold text-xl ml-2">FansPick</span> */}
        </div>
      </Link>

      <div class="items-center">
        <div class="text-lg flex-1"></div>

        <div class="text-xl flex flex-row items-center">
          <Link
            to="/post"
            class="block ml-6 lg:inline-block lg:mt-0 text-teal-200 hover:text-primary-500 mr-8"
          >
            Post a Ticket
          </Link>
          {auth.isAuthenticated ? (
            <Link
              to="/my-tickets"
              class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-primary-500 mr-6"
            >
              My Tickets
            </Link>
          ) : (
            <Link
              to="/login"
              class="block lg:inline-block lg:mt-0 text-teal-200 hover:text-primary-500 mr-8"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);

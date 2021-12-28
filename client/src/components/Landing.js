import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logo from '../images/bruin-exchange-logo.png';

import CourseForm from './global/CourseForm';
import Footer from './global/Footer';

const Landing = ({ auth }) => {
  return (
    <div class="flex flex-col h-screen justify-between">
      <nav class="font-main flex items-center justify-between flex-nowrap p-6 border-b-4">
        <Link to="/">
          <div class="flex items-center flex-shrink-0 mr-8">
            <img className="h-20" src={logo} alt="bruin exchange logo"></img>
            {/* <span class="font-bold text-xl ml-2">FansPick</span> */}
          </div>
        </Link>

        <div class="items-center">
          <div class="text-lg flex-1"></div>

          <div class="text-lg flex flex-row items-center">
            {auth.isAuthenticated ? (
              <Link
                to="/my-tickets"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green-500 mr-6"
              >
                My Tickets
              </Link>
            ) : (
              <Link
                to="/login"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green-500 mr-8"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <CourseForm />

      <Footer />
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);

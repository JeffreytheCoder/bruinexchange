import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logoWhite from '../../images/logo192.png';

const Navbar = ({ auth }) => {
  const [hideMenu, setMenu] = useState(true);

  const authNavbar = (
    <nav class="font-main flex items-center justify-between flex-wrap p-6 border-b-4">
      <Link to="/">
        <div class="flex items-center flex-shrink-0 mr-8">
          <img className="h-10" src={logoWhite} alt="fanspick logo"></img>
          {/* <span class="font-bold text-xl ml-2">FansPick</span> */}
        </div>
      </Link>

      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => {
            setMenu(!hideMenu);
          }}
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          hideMenu ? 'hidden' : ''
        }`}
      >
        <div class="text-lg lg:flex-grow"></div>

        <div class="container flex justify-center items-center px-2 sm:px-4 lg:px-6">
          <div class="relative border-gray-300 border-2 rounded-lg p-0.5">
            {' '}
            <input
              type="text"
              class="h-12 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
              placeholder="Search the course you want..."
            />
            <div class="absolute top-4 right-3">
              {/* <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{' '} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="text-lg flex flex-row items-center mt-4 lg:mt-0">
          <Link
            to="/post"
            class="whitespace-nowrap inline-block text-lg px-4 py-3 leading-none border-2 border-white text-white bg-blue-500 hover:bg-white hover:border-2 hover:text-blue-500 hover:border-blue-500 mr-6 rounded-md"
          >
            Sell Course
          </Link>
          <Link
            to="/following"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-blue-500 mr-8 whitespace-nowrap"
          >
            My Passes
          </Link>
        </div>
      </div>
    </nav>
  );

  const visitorNavbar = (
    <nav class="font-main flex items-center justify-between flex-wrap p-6 border-b-4">
      <Link to="/">
        <div class="flex items-center flex-shrink-0 mr-8">
          <img className="h-10" src={logoWhite} alt="fanspick logo"></img>
          {/* <span class="font-bold text-xl ml-2">FansPick</span> */}
        </div>
      </Link>

      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => {
            setMenu(!hideMenu);
          }}
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          hideMenu ? 'hidden' : ''
        }`}
      >
        <div class="lg:flex-grow"></div>

        <div class="text-lg">
          <Link
            to="/post"
            class="inline-block px-4 py-3 leading-none border-2 rounded border-white text-white bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 mt-4 lg:mt-0 mr-6"
          >
            Get started
          </Link>
          <Link
            to="/login"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-blue-500 mr-6"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );

  return (
    <Fragment> {auth.isAuthenticated ? authNavbar : visitorNavbar} </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);

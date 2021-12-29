import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Navbar from './global/Navbar';
import CourseForm from './global/CourseForm';
import Footer from './global/Footer';

const Landing = ({ auth }) => {
  const [give, setGive] = useState({});
  const [get, setGet] = useState({});

  const search = () => {
    console.log('search!');
  };

  return (
    <div class="flex flex-col h-screen justify-between">
      <CourseForm isGive={true} onChange={setGive} />
      <CourseForm isGive={false} onChange={setGet} />
      <div class="flex flex-col items-center">
        <button class="btn-primary w-auto mt-6" onClick={() => search()}>
          {' '}
          Search
        </button>
      </div>

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

import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CourseForm from './global/CourseForm';
import Ticket from './global/Ticket';
import { setAlert } from '../actions/alert';

const Landing = () => {
  const [giveCourse, setGiveCourse] = useState({});
  const [getCourse, setGetCourse] = useState({});

  const [searched, setSearched] = useState(false);
  const [tickets, setTickets] = useState([]);

  const search = async (e) => {
    e.preventDefault();

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({
      give_course: giveCourse,
      get_course: getCourse,
    });

    const res = await axios.post('/api/ticket/search', body, config);

    setSearched(true);
    setTickets(res.data.tickets);
  };

  return (
    <div class="flex flex-col">
      <form onSubmit={(e) => search(e)}>
        <CourseForm isGive={true} onChange={setGiveCourse} />
        <CourseForm isGive={false} onChange={setGetCourse} />
        <div class="flex flex-col items-center">
          <button
            class="flex btn-primary w-auto mt-8 flex-row text-xl items-center"
            type="submit"
          >
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      <div class="mt-8 flex flex-col items-center">
        {searched ? (
          <div class="flex w-4/5 mb-4 ml-6">
            <text class="text-xl">
              {tickets.length > 0
                ? tickets.length + ' results found'
                : 'No result found'}{' '}
            </text>
          </div>
        ) : (
          <div></div>
        )}
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket} showStatus={false}></Ticket>;
        })}
        {searched ? (
          <div class="flex mx-10 sm:mx-0 mt-2 self-center">
            <text class="font-medium text-lg">
              Can't find the course you want? Try{' '}
              <Link class="text-primary" to="/post">
                post a ticket{' '}
              </Link>
              or search other courses
            </text>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

Landing.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert })(Landing);

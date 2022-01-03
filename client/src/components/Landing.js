import React, { useState } from 'react';
import axios from 'axios';

import CourseForm from './global/CourseForm';
import Ticket from './global/Ticket';

const Landing = () => {
  const [giveCourse, setGiveCourse] = useState({});
  const [getCourse, setGetCourse] = useState({});
  const [tickets, setTickets] = useState([]);

  const search = async () => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({
      give_course: giveCourse,
      get_course: getCourse,
    });

    const res = await axios.post('/api/ticket/search', body, config);
    console.log(res);

    setTickets(res.data.tickets);
  };

  return (
    <div class="flex flex-col">
      <CourseForm isGive={true} onChange={setGiveCourse} />
      <CourseForm isGive={false} onChange={setGetCourse} />
      <div class="flex flex-col items-center">
        <button
          class="flex btn-primary w-auto my-8 flex-row text-xl items-center"
          onClick={() => search()}
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
      <div>
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket}></Ticket>;
        })}
      </div>
    </div>
  );
};

export default Landing;

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
        <button class="btn-primary w-auto my-6" onClick={() => search()}>
          Search
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

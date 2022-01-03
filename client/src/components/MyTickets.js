import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Ticket from './global/Ticket';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    const res = await axios.get('/api/user/tickets/all');
    console.log(res);

    setTickets(res.data.tickets);
  }, []);

  return (
    <div class="flex flex-col">
      <div>
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket}></Ticket>;
        })}
      </div>
    </div>
  );
};

export default MyTickets;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Ticket from './global/Ticket';
import { logout } from '../actions/auth';

const MyTickets = ({ user, logout }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(async () => {
    const res = await axios.get('/api/user/tickets/all');
    console.log(res);

    setTickets(res.data.tickets);
  }, []);

  const clickLogout = async () => {
    logout();
  };

  return (
    <div class="flex flex-col">
      <div class="flex flex-row justify-between w-4/5 self-center items-center mb-4">
        <text class="text-xl font-medium">
          You have {tickets.length}{' '}
          {tickets.length > 1 ? ' tickets' : ' ticket'}
        </text>
        <button class="btn-primary" onClick={() => clickLogout()}>
          Log Out
        </button>
      </div>
      <div>
        {tickets.map((ticket) => {
          const isOwner = user._id == ticket.owner;
          return (
            <Ticket
              ticket={ticket}
              showStatus={true}
              isOwner={isOwner}
            ></Ticket>
          );
        })}
      </div>
    </div>
  );
};

MyTickets.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(MyTickets);

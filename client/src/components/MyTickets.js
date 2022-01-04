import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Ticket from './global/Ticket';
import { logout } from '../actions/auth';

const MyTickets = ({ logout }) => {
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
      <div class="flex flex-row justify-between">
        <text class="text-xl">
          You have {tickets.length}{' '}
          {tickets.length > 1 ? ' tickets' : ' ticket'}
        </text>
        <button class="btn-primary" onClick={() => clickLogout()}>
          Log Out
        </button>
      </div>
      <div>
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket} showStatus={true}></Ticket>;
        })}
      </div>
    </div>
  );
};

MyTickets.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(MyTickets);

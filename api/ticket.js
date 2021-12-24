const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Ticket = require('../models/Ticket');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route    POST api/ticket/
// @desc     current user create an ticket
// @access   Private
router.post(
  '/',
  auth,
  check('type', 'Type is required').not().isEmpty(),
  check('course', 'Course is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let {
        type,
        course,
        price,
        seller,
        buyer,
        confirmSell,
        paid,
        transferDeadline,
        expireDate,
        payDeadline,
      } = req.body;

      // set buyer or seller as the current user according to the ticket type
      if (type == 'buy' && !buyer) {
        buyer = req.user.id;
      }
      if (type == 'sell' && !seller) {
        seller = req.user.id;
      }

      // save page
      const ticket = new ticket({
        type,
        course,
        price,
        seller,
        buyer,
        confirmSell,
        paid,
        transferDeadline,
        expireDate,
        payDeadline,
      });
      await ticket.save();

      // add ticket to user's tickets
      const user = await User.findById(req.user.id);
      user.tickets.unshift(ticket);
      await user.save();

      res.json({ ticket });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/ticket/:ticket_id
// @desc     current user edits an ticket
// @access   Private
router.put(
  '/:ticket_id',
  auth,
  check('type', 'Type is required').not().isEmpty(),
  check('course', 'Course is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the page exists
      let ticket = await ticket.findById(req.params.ticket_id);

      if (!ticket) {
        return res.status(400).json({ msg: 'ticket does not exist' });
      }

      let {
        type,
        course,
        price,
        seller,
        buyer,
        confirmSell,
        paid,
        transferDeadline,
        expireDate,
        payDeadline,
      } = req.body;

      // set buyer or seller as the current user according to the ticket type
      if (type == 'buy') {
        buyer = req.user.id;
      }
      if (type == 'sell') {
        seller = req.user.id;
      }

      // Check if user is the ticket owner
      let user;

      if (type == 'buy') {
        user = buyer;
      } else {
        user = seller;
      }

      if (user && user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the ticket owner, not authorized' });
      }

      const ticketFields = {
        type,
        course,
        price,
        seller,
        buyer,
        confirmSell,
        paid,
        transferDeadline,
        expireDate,
        payDeadline,
      };

      // update ticket
      const updatedticket = await ticket.findOneAndUpdate(
        { _id: req.params.ticket_id },
        { $set: ticketFields },
        { new: true }
      );

      res.json({ updatedticket });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/pages/:ticket_id
// @desc     delete a ticket
// @access   Private
router.delete('/:ticket_id', auth, async (req, res) => {
  try {
    // Check if the page exists
    let ticket = await ticket.findById(req.params.page_id);
    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    // Check if user is the ticket owner
    let userId;

    if (ticket.type == 'buy') {
      userId = ticket.buyer;
    } else {
      userId = ticket.seller;
    }

    if (userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the ticket owner, not authorized' });
    }

    // remove page from user's pages
    const user = await User.findById(userId);
    user.tickets = user.tickets.filter(
      (ticket) => ticket._id.toString() !== req.params.ticket_id.toString()
    );
    await user.save();

    await ticket.remove();
    res.json({ msg: 'ticket removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/pages/:ticket_id
// @desc     get a ticket
// @access   Public
router.get('/:ticket_id', async (req, res) => {
  try {
    // check if the page exists
    let ticket = await ticket.findById(req.params.ticket_id);
    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    res.json({ ticket });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/ticket/:ticket_id/confirmsell
// @desc     current user (seller) confirms selling a buying ticket by others
// @access   Private
router.put('/:ticket_id/confirmsell', auth, async (req, res) => {
  try {
    // Check if the page exists
    let ticket = await ticket.findById(req.params.ticket_id);

    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    // check if the ticket has been confirmed selling
    if (ticket.confirmSell) {
      return res.status(400).json({ msg: 'ticket has been confirmed sold' });
    }

    // check if is buying ticket
    if (ticket.type != 'buy') {
      return res.status(400).json({ msg: 'ticket is not a buying ticket' });
    }

    // check if current user is not the buyer
    if (ticket.buyer == req.user.id) {
      return res.status(400).json({ msg: 'You cannot buy your own ticket' });
    }

    const ticketFields = {
      confirmSell: true,
      seller: req.user.id,
    };

    // update ticket
    const updatedticket = await ticket.findOneAndUpdate(
      { _id: req.params.ticket_id },
      { $set: ticketFields },
      { new: true }
    );

    res.json({ updatedticket });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/ticket/:ticket_id/pay
// @desc     current user (buyer) pays a selling ticket by others or confirmed selling buying ticket by the current user
// @access   Private
router.put('/:ticket_id/pay', auth, async (req, res) => {
  try {
    // Check if the page exists
    let ticket = await ticket.findById(req.params.ticket_id);

    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    // check if the ticket has been paid
    if (ticket.paid) {
      return res.status(400).json({ msg: 'ticket has been paid' });
    }

    // if is a selling ticket, check if the current user is not the seller
    // update buyer and paid
    if (ticket.type == 'sell') {
      if (ticket.seller == req.user.id) {
        return res
          .status(400)
          .json({ msg: 'You cannot buy your own selling ticket' });
      }

      const ticketFields = {
        paid: true,
        buyer: req.user.id,
      };

      const updatedticket = await ticket.findOneAndUpdate(
        { _id: req.params.ticket_id },
        { $set: ticketFields },
        { new: true }
      );

      res.json({ updatedticket });
    }

    // if is a buying ticket, check if it is confirmed selling and the buyer is the current user
    // update paid
    else {
      if (!ticket.confirmSell) {
        return res
          .status(400)
          .json({ msg: 'The ticket does not have a seller yet' });
      }

      if (ticket.buyer != req.user.id) {
        return res
          .status(400)
          .json({ msg: "You cannot pay for another user's buying ticket" });
      }

      const ticketFields = {
        paid: true,
      };

      const updatedticket = await ticket.findOneAndUpdate(
        { _id: req.params.ticket_id },
        { $set: ticketFields },
        { new: true }
      );

      res.json({ updatedticket });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

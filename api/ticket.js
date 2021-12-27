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
  check('subject', 'Subject is required').not().isEmpty(),
  check('course', 'Course is required').not().isEmpty(),
  check('lec', 'Lec is required').not().isEmpty(),
  check('disc', 'Disc is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { subject, course, lec, disc, owner, guest, complete } = req.body;

      // set the owner as the current user
      if (!owner) {
        owner = req.user.id;
      }

      // save page
      const ticket = new Ticket({
        subject,
        course,
        lec,
        disc,
        owner,
        guest,
        complete,
      });
      await Ticket.save();

      // add ticket to user's tickets
      const user = await User.findById(req.user.id);
      user.tickets.unshift(Ticket);
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
  check('subject', 'Subject is required').not().isEmpty(),
  check('course', 'Course is required').not().isEmpty(),
  check('lec', 'Lec is required').not().isEmpty(),
  check('disc', 'Disc is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the page exists
      let ticket = await Ticket.findById(req.params.ticket_id);

      if (!ticket) {
        return res.status(400).json({ msg: 'Ticket does not exist' });
      }

      let { subject, course, lec, disc, owner, guest, complete } = req.body;

      // set the owner as the current user
      if (!owner) {
        owner = req.user.id;
      }

      // Check if user is the ticket owner
      if (owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the ticket owner, not authorized' });
      }

      const ticketFields = {
        subject,
        course,
        lec,
        disc,
        owner,
        guest,
        complete,
      };

      // update ticket
      const updatedTicket = await ticket.findOneAndUpdate(
        { _id: req.params.ticket_id },
        { $set: ticketFields },
        { new: true }
      );

      res.json({ updatedTicket });
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
    let ticket = await Ticket.findById(req.params.page_id);
    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    // Check if user is the ticket owner
    if (ticket.owner.toString() !== req.user.id) {
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
    let ticket = await Ticket.findById(req.params.ticket_id);
    if (!ticket) {
      return res.status(400).json({ msg: 'ticket does not exist' });
    }

    res.json({ ticket });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/ticket/:ticket_id/complete
// @desc     current user (guest) completes a ticket
// @access   Private
router.put('/:ticket_id/complete', auth, async (req, res) => {
  try {
    // Check if the page exists
    let ticket = await Ticket.findById(req.params.ticket_id);

    if (!ticket) {
      return res.status(400).json({ msg: 'Ticket does not exist' });
    }

    const ticketFields = {
      complete: true,
      guest: req.user.id,
    };

    // update ticket
    const updatedTicket = await ticket.findOneAndUpdate(
      { _id: req.params.ticket_id },
      { $set: ticketFields },
      { new: true }
    );

    res.json({ updatedTicket });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

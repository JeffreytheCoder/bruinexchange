const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const _ = require('lodash');

const Ticket = require('../models/Ticket');
const User = require('../models/User');
const auth = require('../middleware/auth');

const subjectCourses = require('../public/subjectCourses.json');

// @route    POST api/ticket/
// @desc     current user create an ticket
// @access   Private
router.post(
  '/',
  auth,
  check('give_course', 'Give_course is required').not().isEmpty(),
  check('get_course', 'Get_courses is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let { give_course, get_course, owner, guest, complete } = req.body;

      // check if give_course and get_courses are valid
      if (
        !(give_course.subject in subjectCourses) ||
        !(give_course.course in subjectCourses[give_course.subject].courses)
      ) {
        return res
          .status(400)
          .json({ msg: 'Give_course is not a valid course' });
      }

      if (
        !(get_course.subject in subjectCourses) ||
        !(get_course.course in subjectCourses[get_course.subject].courses)
      ) {
        return res
          .status(400)
          .json({ msg: 'One or more of get_courses is not a valid course' });
      }

      // check if the current user already has a ticket with the same give_course
      const user = await User.findById(req.user.id);

      for (const ticketId of user.tickets) {
        const ticket = await Ticket.findById(ticketId);

        if (
          ticket.give_course.subject == give_course.subject &&
          ticket.give_course.course == give_course.course
        ) {
          return res.status(400).json({
            msg: 'You already have a ticket with the same give_course. Try edit that ticket',
          });
        }
      }

      // set the owner as the current user
      if (!owner) {
        owner = req.user.id;
      }

      // save page
      const ticket = new Ticket({
        give_course,
        get_course,
        owner,
        guest,
        complete,
      });
      await ticket.save();

      // add ticket to user's tickets
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
  check('give_course', 'Give_course is required').not().isEmpty(),
  check('get_course', 'Get_courses is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the ticket exists
      let ticket = await Ticket.findById(req.params.ticket_id);

      if (!ticket) {
        return res.status(400).json({ msg: 'Ticket does not exist' });
      }

      let { give_course, get_course, owner, guest, complete } = req.body;

      // Check if user is the ticket owner
      if (owner.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the ticket owner, not authorized' });
      }

      // check if give_course and get_courses are valid
      if (
        !(give_course.subject in subjectCourses) ||
        !(give_course.course in subjectCourses[give_course.subject].courses)
      ) {
        return res
          .status(400)
          .json({ msg: 'Give_course is not a valid course' });
      }

      if (
        !(get_course.subject in subjectCourses) ||
        !(get_course.course in subjectCourses[get_course.subject].courses)
      ) {
        return res
          .status(400)
          .json({ msg: 'One or more of get_courses is not a valid course' });
      }

      // check if the current user already has a ticket with the same give_course
      const user = await User.findById(req.user.id);

      for (const ticketId of user.tickets) {
        const ticket = await Ticket.findById(ticketId);

        if (
          ticket.give_course.subject == give_course.subject &&
          ticket.give_course.course == give_course.course
        ) {
          return res.status(400).json({
            msg: 'You already have a ticket with the same give_course. Try edit that ticket',
          });
        }
      }

      // update ticket
      const ticketFields = {
        give_course,
        get_course,
        owner,
        guest,
        complete,
      };

      const updatedTicket = await Ticket.findOneAndUpdate(
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

// @route    GET api/ticket/:ticket_id
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

// @route    GET api/ticket/search
// @desc     search for similar tickets based on search conditions
// @access   Public
router.get('/search', async (req, res) => {
  try {
    const { give_course, get_course } = req.body;

    let getMatchGiveTickets = [];

    if (give_course.lec) {
      if (give_course.disc) {
        getMatchGiveTickets = await Ticket.findAll({
          give_course: {
            subject: get_course.subject,
            course: get_course.course,
            lec: get_course.lec,
            disc: get_course.disc,
            complete: false,
          },
        });
      } else {
        getMatchGiveTickets = await Ticket.findAll({
          give_course: {
            subject: get_course.subject,
            course: get_course.course,
            lec: get_course.lec,
            complete: false,
          },
        });
      }
    } else {
      getMatchGiveTickets = await Ticket.findAll({
        give_course: {
          subject: get_course.subject,
          course: get_course.course,
          complete: false,
        },
      });
    }

    let giveMatchGetTickets = [];

    await Ticket.findAll(
      {
        get_course: {
          subject: give_course.subject,
          course: give_course.course,
          complete: false,
        },
      },
      (err, ticket) => {
        if (ticket.get_course.lec) {
          if (ticket.get_course.disc) {
            if (ticket.get_course.disc == give_course.disc) {
              giveMatchGetTickets.push(ticket);
            } else {
              return;
            }
          }
          if (ticket.get_course.lec == give_course.lec) {
            giveMatchGetTickets.push(ticket);
          } else {
            return;
          }
        } else {
          giveMatchGetTickets.push(ticket);
        }
      }
    );

    let tickets = [];

    getMatchGiveTickets.forEach((getMatchGiveTicket) => {
      giveMatchGetTickets.forEach((giveMatchGetTicket) => {
        if (_.isEqual(getMatchGiveTicket, giveMatchGetTicket)) {
          tickets.push(getMatchGiveTicket);
        }
      });
    });

    res.json({ tickets });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

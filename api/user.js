const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Ticket = require('../models/Ticket');

// @route    POST api/user
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('email', 'Please enter your UCLA email').custom((value) => {
    if (/ucla.edu/.test(value)) {
      return true;
    }
    throw new Error('Not UCLA email');
  }),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if the user already exists
      user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' });
      }

      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/user/:user_id
// @desc     Update user
// @access   Private
router.put(
  '/:user_id',
  auth,
  check('email', 'Please enter your UCLA email').custom((value) => {
    if (/@ucla.com/.test(value)) {
      return true;
    }
    throw new Error('Not UCLA email');
  }),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password } = req.body;

    try {
      // check if the user exists
      user = await User.findById(req.params.user_id);
      if (!user) {
        return res.status(400).json({ msg: 'User does not exists' });
      }

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const userFields = { email, password };

      // update page
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.user_id },
        { $set: userFields },
        { new: true }
      );

      res.json({ updatedUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/user/login
// @desc     authenticate user & get token
// @access   Public
router.post(
  '/login',
  check('email', 'Please enter your UCLA email').custom((value) => {
    if (/ucla.edu/.test(value)) {
      return true;
    }
    throw new Error('Not UCLA email');
  }),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      ``;
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // check is the encrypted password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Email or password incorrect' });
      }

      // return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '30 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/users/:user_id
// @desc     get a user
// @access   Public
router.get('/:user_id', async (req, res) => {
  try {
    // check if the user exists
    let user = await User.findById(req.params.user_id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/user
// @desc     get the current user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    // check if the user exists
    let user = await User.findById(req.user.id).select('-password');

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/user/tickets/:type
// @desc     get the current users' tickets of input type
// @access   Private
router.get('/tickets/:type', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let tickets = [];

    if (req.params.type == 'all') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);
        tickets.push(ticket);
      }
      res.json({ tickets });
    } else if (req.params.type == 'buy') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);

        if (ticket.type == 'buy') {
          tickets.push(ticket);
        }
      }
      res.json({ tickets });
    } else if (req.params.type == 'sell') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);

        if (ticket.type == 'sell') {
          tickets.push(ticket);
        }
      }
      res.json({ tickets });
    } else if (req.params.type == 'complete') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);

        if (ticket.paid) {
          tickets.push(ticket);
        }
      }
      res.json({ tickets });
    } else if (req.params.type == 'pending') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);

        if (!ticket.paid) {
          tickets.push(ticket);
        }
      }
      res.json({ tickets });
    } else if (req.params.type == 'need_action') {
      for (const cur of user.tickets) {
        const ticket = await Ticket.findById(cur._id);

        if (ticket.confirmSell && !ticket.paid) {
          tickets.push(ticket);
        }
      }
      res.json({ tickets });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

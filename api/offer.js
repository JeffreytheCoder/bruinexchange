const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const Offer = require('../models/Offer');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route    POST api/offer/
// @desc     current user create an offer
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

      // set buyer or seller as the current user according to the offer type
      if (type == 'buy' && !buyer) {
        buyer = req.user.id;
      }
      if (type == 'sell' && !seller) {
        seller = req.user.id;
      }

      // save page
      const offer = new Offer({
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
      await offer.save();

      // add offer to user's offers
      const user = await User.findById(req.user.id);
      user.offers.unshift(offer);
      await user.save();

      res.json({ offer });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/offer/:offer_id
// @desc     current user edits an offer
// @access   Private
router.put(
  '/:offer_id',
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
      let offer = await Offer.findById(req.params.offer_id);

      if (!offer) {
        return res.status(400).json({ msg: 'Offer does not exist' });
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

      // set buyer or seller as the current user according to the offer type
      if (type == 'buy') {
        buyer = req.user.id;
      }
      if (type == 'sell') {
        seller = req.user.id;
      }

      // Check if user is the offer owner
      let user;

      if (type == 'buy') {
        user = buyer;
      } else {
        user = seller;
      }

      if (user && user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: 'User is not the offer owner, not authorized' });
      }

      const offerFields = {
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

      // update offer
      const updatedOffer = await Offer.findOneAndUpdate(
        { _id: req.params.offer_id },
        { $set: offerFields },
        { new: true }
      );

      res.json({ updatedOffer });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/pages/:offer_id
// @desc     delete a offer
// @access   Private
router.delete('/:offer_id', auth, async (req, res) => {
  try {
    // Check if the page exists
    let offer = await Offer.findById(req.params.page_id);
    if (!offer) {
      return res.status(400).json({ msg: 'Offer does not exist' });
    }

    // Check if user is the offer owner
    let userId;

    if (offer.type == 'buy') {
      userId = offer.buyer;
    } else {
      userId = offer.seller;
    }

    if (userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User is not the offer owner, not authorized' });
    }

    // remove page from user's pages
    const user = await User.findById(userId);
    user.offers = user.offers.filter(
      (offer) => offer._id.toString() !== req.params.offer_id.toString()
    );
    await user.save();

    await offer.remove();
    res.json({ msg: 'Offer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/pages/:offer_id
// @desc     get a offer
// @access   Public
router.get('/:offer_id', async (req, res) => {
  try {
    // check if the page exists
    let offer = await Offer.findById(req.params.offer_id);
    if (!offer) {
      return res.status(400).json({ msg: 'Offer does not exist' });
    }

    res.json({ offer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/offer/:offer_id/confirmsell
// @desc     current user (seller) confirms selling a buying offer by others
// @access   Private
router.put('/:offer_id/confirmsell', auth, async (req, res) => {
  try {
    // Check if the page exists
    let offer = await Offer.findById(req.params.offer_id);

    if (!offer) {
      return res.status(400).json({ msg: 'Offer does not exist' });
    }

    // check if the offer has been confirmed selling
    if (offer.confirmSell) {
      return res.status(400).json({ msg: 'Offer has been confirmed sold' });
    }

    // check if is buying offer
    if (offer.type != 'buy') {
      return res.status(400).json({ msg: 'Offer is not a buying offer' });
    }

    // check if current user is not the buyer
    if (offer.buyer == req.user.id) {
      return res.status(400).json({ msg: 'You cannot buy your own offer' });
    }

    const offerFields = {
      confirmSell: true,
      seller: req.user.id,
    };

    // update offer
    const updatedOffer = await Offer.findOneAndUpdate(
      { _id: req.params.offer_id },
      { $set: offerFields },
      { new: true }
    );

    res.json({ updatedOffer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/offer/:offer_id/pay
// @desc     current user (buyer) pays a selling offer by others or confirmed selling buying offer by the current user
// @access   Private
router.put('/:offer_id/pay', auth, async (req, res) => {
  try {
    // Check if the page exists
    let offer = await Offer.findById(req.params.offer_id);

    if (!offer) {
      return res.status(400).json({ msg: 'Offer does not exist' });
    }

    // check if the offer has been paid
    if (offer.paid) {
      return res.status(400).json({ msg: 'Offer has been paid' });
    }

    // if is a selling offer, check if the current user is not the seller
    // update buyer and paid
    if (offer.type == 'sell') {
      if (offer.seller == req.user.id) {
        return res
          .status(400)
          .json({ msg: 'You cannot buy your own selling offer' });
      }

      const offerFields = {
        paid: true,
        buyer: req.user.id,
      };

      const updatedOffer = await Offer.findOneAndUpdate(
        { _id: req.params.offer_id },
        { $set: offerFields },
        { new: true }
      );

      res.json({ updatedOffer });
    }

    // if is a buying offer, check if it is confirmed selling and the buyer is the current user
    // update paid
    else {
      if (!offer.confirmSell) {
        return res
          .status(400)
          .json({ msg: 'The offer does not have a seller yet' });
      }

      if (offer.buyer != req.user.id) {
        return res
          .status(400)
          .json({ msg: "You cannot pay for another user's buying offer" });
      }

      const offerFields = {
        paid: true,
      };

      const updatedOffer = await Offer.findOneAndUpdate(
        { _id: req.params.offer_id },
        { $set: offerFields },
        { new: true }
      );

      res.json({ updatedOffer });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

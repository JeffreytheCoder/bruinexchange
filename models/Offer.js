const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  confirmSell: {
    type: Boolean,
    default: false,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  transferDeadline: {
    type: Date,
  },
  expireDate: {
    type: Date,
  },
  payDeadline: {
    type: Date,
  },
});

module.exports = mongoose.model('offer', OfferSchema);

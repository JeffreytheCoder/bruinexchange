const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  give_course: {
    subject: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    lec: {
      type: String,
      required: true,
    },
    disc: {
      type: String,
      required: true,
    },
  },
  get_courses: [
    {
      subject: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      lec: {
        type: String,
      },
      disc: {
        type: String,
      },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ticket', TicketSchema);

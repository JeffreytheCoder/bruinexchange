const express = require('express');
const connectDB = require('./config/db');
// const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
// app.use(
//   multer({
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//   })
// );

// Define Routes
app.use('/api/user', require('./api/user'));
app.use('/api/ticket', require('./api/ticket'));
// app.use('/api/posts', require('./api/posts'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});

const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = '$2a$10$W/H7J.KKGNCjeR7xhej84OGWZOaiDchg2goMXUYC3jcsL8LNGrNz2';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// const message = 'I am user number 3';
// const hasString = SHA256(message).toString();
// console.log(hasString);
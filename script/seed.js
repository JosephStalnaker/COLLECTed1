'use strict';

const db = require('../server/db/db.js');
const User = require('../server/db/models/user.js');
const Book = require('../server/db/models/book.js');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const users = [
  {
    username: 'user1',
    firstName: 'User',
    lastName: 'One',
    password: 'password1',
    location: 'New York, NY',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
  {
    username: 'user2',
    firstName: 'User2',
    lastName: 'Two',
    password: 'password2',
    location: 'Berlin, Germany',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
  {
    username: 'user3',
    firstName: 'User3',
    lastName: 'Three',
    password: 'password3',
    location: 'Vienna, Austria',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
];

const books = [
  {
    title: 'Book',
    author: 'Book Writer',
    publisher: 'Book Publisher',
    edition: '1st',
    description:
      'Book about books regarding the history of books written in book form.',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
  {
    title: 'Book2',
    author: 'Book Writer 2',
    publisher: 'Book Publisher2',
    edition: '1st',
    description:
      'Book about books regarding the history of books written in book form.',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
  {
    title: 'Book3',
    author: 'Book Writer 3',
    publisher: 'Book Publisher 3',
    edition: '1st',
    description:
      'Book about books regarding the history of books written in book form.',
    imageUrl:
      'https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );
  await Promise.all(
    books.map((book) => {
      return Book.create(book);
    })
  );
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

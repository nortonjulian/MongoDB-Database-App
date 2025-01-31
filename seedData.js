import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import Post from './models/Post.js';
import User from './models/User.js'; // Import the User model

const seedUsers = [
  { username: 'user1', email: 'user1@example.com' },
  { username: 'user2', email: 'user2@example.com' },
  { username: 'user3', email: 'user3@example.com' },
  { username: 'user4', email: 'user4@example.com' },
  { username: 'user5', email: 'user5@example.com' }
];

const seedPosts = [
  { title: 'First Post', content: 'This is the content of the first post', author: 'user1' },
  { title: 'Second Post', content: 'Content for second post', author: 'user2' },
  { title: 'Third Post', content: 'Here is the third post content', author: 'user3' },
  { title: 'Fourth Post', content: 'Fourth post content here', author: 'user4' },
  { title: 'Fifth Post', content: 'Content for the fifth post', author: 'user5' }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Insert sample users if they don't exist already
    await User.insertMany(seedUsers, { ordered: false }).catch(err => console.log('Error inserting users:', err));

    // Insert sample posts with author as string (username)
    await Post.insertMany(seedPosts, { ordered: false });
    console.log('Seed posts inserted');

  } catch (err) {
    console.error('Error inserting seed data:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedData();

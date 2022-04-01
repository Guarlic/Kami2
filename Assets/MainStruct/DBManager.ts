import mongoose from 'mongoose';

const { dburl } = require('../../config.json');

export function Connect() {
  mongoose
    .connect(dburl, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      family: 4, // Use IPv4, skip trying IPv6
    })
    .then(() => console.log('==> MongoDB Connected...'))
    .catch(err => console.error(err));
}

export function FindUserData() {}

export function FindCmdData() {}

export function AddUserData() {}

export function AddCmdData() {}

export function InitDB() {
  Connect();
}

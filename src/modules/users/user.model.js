import mongoose from 'mongoose';
const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  documentId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'leader', 'student']
  },
  status: {
    type: String,
    enum: ['pending', 'authorized', 'unauthorized']
  },
  password: {
    type: String,
  }
}, { versionKey: false });

const Users = new mongoose.model('users', usersSchema);

export default Users;

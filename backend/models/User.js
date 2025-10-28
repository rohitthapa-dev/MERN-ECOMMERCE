import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: [5, 'Username must be at least 5 characters long'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minLength: [5, 'Passeord must be at least 5 characters long'],
    required: true
  },
  role: {
    type: String,
    enum: ["Admin",
      "User"],
    default: 'User'
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
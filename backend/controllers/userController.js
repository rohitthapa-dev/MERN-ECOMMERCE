
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email });

    if (!isExist) return res.status(404).json({ message: 'User not found' });
    const checkPass = bcrypt.compareSync(password, isExist.password);
    if (!checkPass) return res.status(400).json({ messsage: 'Invalid credentials' });
    const token = jwt.sign({ id: isExist._id, role: isExist.role }, 'secret');

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true
    });

    return res.status(200).json({
      token,
      role: isExist.role
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const registerUser = async (req, res) => {

  try {
    const { email, username, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    await User.create({
      email,
      username,
      password: hashPassword
    });

    return res.status(201).json({ message: 'Register sucessfully' });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.userId)) {
      return res.status(400).json({ message: 'Invalid Id' });
    }
    const isExist = await User.findById(req.userId);
    if (!isExist) {
      return res.status(404).json({ message: 'User not found' })
    }

    isExist.email = req.body?.email || isExist.email;
    isExist.username = req.body?.username || isExist.username;

    await isExist.save();

    return res.status(201).json({ message: 'Update sucessfully' });

  } catch (err) {
    return res.status(400).json({ message: err?.message });
  }
}

export const getUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.userId)) return res.status(400).json({ message: 'Invalid Id' });
    const isExist = await User.findById(req.userId).select('username email role');
    if (!isExist) return res.status(404).json({ message: 'User not found' })
    return res.status(200).json(isExist);

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
const bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SALT_ROUNDS = 10;

class AuthService {
  static async register({ name, email, password }) {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    return User.create({
      name,
      email,
      passwordHash,
    });
  }

  static async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

module.exports = AuthService;

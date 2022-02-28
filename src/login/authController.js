const User = require('../../models/User');
const Counter = require('../../models/Counter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');
const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Error registering', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'User with this name alredy exist' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const counter = new Counter({
        title: 'Income counter',
        typeincome: 'Income',
        timestamp: 0,
        income: 0,
        period: 0,
        output: 0,
      });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
        counters: [{ counter }],
      });
      await user.save();
      return res.json({ message: 'User successfully registered' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ messaje: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Password wrong' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ messaje: 'Login error' });
    }
  }

  async createCounter(req, res) {
    try {
      const { username, title, typeincome, timestamp, income, period, output } =
        req.body;
      const counter = new Counter({
        title: `${title}`,
        typeincome: `${typeincome}`,
        timestamp: `${timestamp}`,
        income: `${income}`,
        period: `${period}`,
        output: `${output}`,
      });
      const user = await User.findOne({ username });
      if (user) {
        user.counters.push(counter);
        await user.save();
      } else {
        return res.json({ message: `User ${username} not found` });
      }

      return res.json({ message: 'User counters' });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCounter(req, res) {
    try {
      const { username, index, title } = req.body;
      const user = await User.findOne({ username });
      user.counters.splice(index, 1);
      await user.save();
      return res.json({ message: `Counter ${title} was successfull deleted` });
    } catch (e) {
      console.log(e);
    }
  }

  async getCounters(req, res) {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username });
      const counters = user.counters;
      return res.json(counters);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();

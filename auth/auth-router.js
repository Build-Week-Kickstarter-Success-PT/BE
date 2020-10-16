const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');

router.post('/register', async (req, res, next) => {
  const user = req.body;

  const userExist = await Users.findBy({ email: user.email }).first();
  if (userExist) {
    res.status(400).json({ message: 'user already exists, please log in!' });
    return;
  }

  const rounds = process.env.BCRYPT_ROUNDS
    ? parseInt(process.env.BCRYPT_ROUNDS)
    : 10;

  const hash = bcryptjs.hashSync(user.password, rounds);
  user.password = hash;

  try {
    if (isValid(user)) {
      const newUser = await Users.add(user);
      res.status(201).json({
        auth: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } else {
      next({
        apiCode: 400,
        apiMessage: 'name, email or password missing',
      });
    }
  } catch (error) {
    next({ apiCode: 500, apiMessage: 'error saving new user', ...error });
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!isValid(req.body)) {
      next({ apiCode: 400, apiMessage: 'email or password invalid' });
    } else {
      const user = await Users.findBy({ email }).first();

      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: 'Welcome to the api',
          auth: { id: user.id, name: user.name, email: user.email },
          token: token,
        });
      } else {
        next({ apiCode: 401, apiMessage: 'invalid credentials' });
      }
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'db error loggin in', ...err });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

module.exports = router;

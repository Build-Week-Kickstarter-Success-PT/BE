const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');

router.post('/register', async (req, res, next) => {
  const newUser = req.body;

  const userExists = await Users.findBy({ username: newUser.username })

    .then((found) => {
      if (found) {
        res.status(400).json({ message: 'user already exists. please login!' });
        return;
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
      return;
    });

  newUser.username ? userExists : null;

  try {
    if (isValid(newUser)) {
      const rounds = process.env.BCRYPT_ROUNDS
        ? parseInt(process.env.BCRYPT_ROUNDS)
        : 10;

      const hash = bcryptjs.hashSync(newUser.password, rounds);
      newUser.password = hash;

      const user = await Users.add(newUser);
      const token = generateToken(user);
      res.status(201).json({ data: user, token });
    } else {
      next({ apiCode: 400, apiMessage: 'username or password missing' });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'error saving new user', ...err });
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!isValid(req.body)) {
      next({ apiCode: 400, apiMessage: 'username or password invalid' });
    } else {
      const [user] = await Users.findBy({ username: username });

      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: 'Welcome to the api', data: user, token: token });
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
    username: user.username,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

module.exports = router;

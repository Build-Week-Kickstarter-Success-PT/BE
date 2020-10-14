const router = require('express').Router();
const Users = require('../users/users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'db error getting users', ...err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await Users.remove(id);
    res.status(200).json({ userToDelete, message: 'deleted' });
  } catch (err) {
    res.status(500).json({ message: 'failed to delete store' });
  }
});

module.exports = router;

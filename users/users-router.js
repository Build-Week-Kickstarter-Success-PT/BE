const router = require('express').Router();
const Users = require('../users/users-model.js');
const Campaigns = require('../campaigns/campaigns-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'db error getting users', ...err });
  }
});

router.delete('/:id', restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await Users.remove(id);
    res.status(200).json({ userToDelete, message: 'deleted' });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to delete user', ...err });
  }
});

// /api/user/campaigns
router.get('/:id/campaigns', restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaignById = await Campaigns.findByUserId(id);
    if (!campaignById) {
      next({
        apiCode: 400,
        apiMessage: 'there are no campaigns, please add one',
      });
    }
    res.status(200).json(campaignById);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to get campaign with id' });
  }
});

module.exports = router;

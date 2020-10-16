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
  const { id } = req.params;
  try {
    const userToDelete = await Users.remove(id);
    res.status(200).json({ userToDelete, message: 'deleted' });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to delete user', ...err });
  }
});

// Campaign CRUD routes
// GET users/:id/campaigns
router.get('/:id/campaigns', restricted, async (req, res, next) => {
  const { id } = req.params;
  try {
    const campaigns = await Campaigns.findById(id);
    if (campaigns.length === 0) {
      next({
        apiCode: 404,
        apiMessage: 'there are no campaigns, please add one',
      });
    }

    const campaignById = await Campaigns.findById(id);

    res.status(200).json(campaignById);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to get campaign with id' });
  }
});

// POST users/:id/campaigns
router.post('/:id/campaigns', restricted, async (req, res, next) => {
  const campaign = req.body;
  campaign.user_id = req.params.id;

  try {
    const newCampaign = await Campaigns.add(campaign);
    res.status(201).json(newCampaign);
  } catch (err) {
    next({ apiCode: 400, apiMessage: 'missing campaign fields' });
  }
});

// UPDATE users/:id/campaigns/:campaign_id
router.put(
  '/:id/campaigns/:campaign_id',
  restricted,
  async (req, res, next) => {
    const { campaign_id } = req.params;
    const changes = req.body;

    const campaign = Campaigns.findById(campaign_id);

    try {
      if (campaign) {
        await Campaigns.update(changes, campaign_id);
        const updatedCampaign = await Campaigns.findById(req.params.id).first();

        res.status(200).json({
          updatedCampaign,
          message: 'campaign updated',
        });
      }
    } catch (err) {
      next({ apiCode: 500, apiMessage: 'failed to update campaign' });
    }
  }
);

// DELETE users/:id/campaigns/:campaign_id
router.delete(
  '/:id/campaigns/:campaign_id',
  restricted,
  async (req, res, next) => {
    const { campaign_id } = req.params;

    const campaign = Campaigns.findById(campaign_id);

    try {
      if (campaign) {
        await Campaigns.remove(campaign_id);
        const campaigns = await Campaigns.findById(req.params.id);

        res.status(200).json({
          campaigns,
          message: 'campaign deleted',
        });
      }
    } catch (err) {
      next({ apiCode: 500, apiMessage: 'failed to delete campaigns', ...err });
    }
  }
);

module.exports = router;

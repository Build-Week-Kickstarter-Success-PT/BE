const router = require('express').Router();
const Campaigns = require('../campaigns/campaigns-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, async (req, res, next) => {
  try {
    const campaigns = await Campaigns.find();
    res.status(200).json(campaigns);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'db error getting campaigns', ...err });
  }
});

router.get('/:id', restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaignById = await Campaigns.findById(id);
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

router.post('/', restricted, async (req, res, next) => {
  try {
    const campaign = await Campaigns.add(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to post campaign' });
  }
});

router.put('/:id', restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    await Campaigns.update(id, changes);
    const updatedCampaign = await Campaigns.find();
    res.status(200).json({
      updatedCampaign,
      message: 'campaign updated',
    });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to update campaign' });
  }
});

router.delete('/:id', restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const campaignToDelete = await Campaigns.remove(id);
    res.status(200).json({ userToDelete, message: 'deleted' });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'failed to delete campaigns', ...err });
  }
});

module.exports = router;

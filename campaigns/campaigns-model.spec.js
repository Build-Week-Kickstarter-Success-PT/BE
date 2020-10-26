const db = require('../database/db-config.js');
const Campaigns = require('./campaigns-model.js');
const campaign = {
  campaign_name: 'Sample Campaign Name',
  goal: 10000,
  description: 'Sample description',
  campaign_length: 20,
  category: 'Sample Category',
  sub_category: 'Sample Sub Category',
  country: 'Sample Country',
  user_id: 1,
};

describe('campaigns model', () => {
  describe('add', () => {
    beforeEach(async () => {
      await db('campaigns').truncate();
      await Campaigns.add(campaign);
    });

    it('should add campaigns into the db', async () => {
      const campaigns = await db('campaigns');
      expect(campaigns).toHaveLength(1);
    });

    it('should return what was inserted', async () => {
      expect(campaign).toMatchObject({
        campaign_name: 'Sample Campaign Name',
        goal: 10000,
        description: 'Sample description',
        campaign_length: 20,
        category: 'Sample Category',
        sub_category: 'Sample Sub Category',
        country: 'Sample Country',
        user_id: 1,
      });
    });
  });

  describe('find', () => {
    it('should find campaigns', async () => {
      await Campaigns.find();

      const campaigns = await db('campaigns');
      expect(campaigns).toHaveLength(1);
    });
  });

  describe('findById', () => {
    beforeEach(async () => {
      await db('campaigns').truncate();
      await Campaigns.add(campaign);
      await Campaigns.add(campaign);
    });
    it('should find campaign by Id', async () => {
      await db('campaigns');

      const campaign = await Campaigns.findById(1).first();
      expect(campaign).toBe(campaign);
    });
  });
});
describe('update', () => {
  beforeEach(async () => {
    await db('campaigns').truncate();
    await Campaigns.add(campaign);
    await Campaigns.add(campaign);
  });
  it('should update campaign', async () => {
    await db('campaigns');
    const changes = {
      campaign_name: 'Sample Updated',
      goal: 10000,
      description: 'Sample description',
      campaign_length: 20,
      category: 'Sample Category',
      sub_category: 'Sample Sub Category',
      country: 'Sample Country',
      user_id: 1,
    };

    const campaign = await Campaigns.update(changes, 1);

    expect(campaign).toBe(1);
  });
});

describe('remove', () => {
  beforeEach(async () => {
    await db('campaigns').truncate();

    await Campaigns.add(campaign);
  });

  it('should delete a campaign from DB', async () => {
    await Campaigns.remove(1);

    const campaign = await Campaigns.findById(1);
    expect(campaign).toHaveLength(0);
  });

  it('should delete correct campaign', async () => {
    await Campaigns.remove(1);

    const campaign = await Campaigns.findById(1);
    expect(campaign).toBe(campaign);
  });
});

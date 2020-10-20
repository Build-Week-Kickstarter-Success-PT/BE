exports.seed = function (knex) {
  // Inserts seed entries
  return knex('campaigns').insert([
    {
      id: 1,
      campaign_name: 'RGKit Play: Play with movement like a pro.',
      goal: 5000,
      description:
        'A motion control kit that lets you add tons of movements to your design, camera and light, instantly.',
      campaign_length: '30',
      category: 'Design & Tech',
      user_id: 1,
    },
    {
      id: 2,
      campaign_name: 'Eteria - Amazing Filterless Personal Air Purifier',
      goal: 58719,
      description:
        'Finally redefining the concept of air purifiers thanks to a diffused purification and monitoring system - with powerful nanomaterials.',
      campaign_length: '20',
      category: 'Design & Tech',
      user_id: 2,
    },
    {
      id: 3,
      campaign_name: 'Eteria - Amazing Filterless Personal Air Purifier',
      goal: 58719,
      description:
        'Finally redefining the concept of air purifiers thanks to a diffused purification and monitoring system - with powerful nanomaterials.',
      campaign_length: '20',
      category: 'Design & Tech',
      user_id: 5,
    },
  ]);
};

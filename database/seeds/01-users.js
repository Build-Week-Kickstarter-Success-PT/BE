exports.seed = function (knex) {
  // Inserts seed entries
  return knex('users').insert([
    {
      id: 1,
      name: 'John Doe',
      email: 'test@email.com',
      password: 'password',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'email@email.com',
      password: 'password',
    },
  ]);
};

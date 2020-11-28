exports.seed = function(knex) {
  return knex('roles').select().then(roles => {
    return knex('users').insert([
      { username: 'admin', password: 'password', role_id: roles.find(role => role.role === 'ADMIN').id },
      { username: 'user', password: 'password', role_id: roles.find(role => role.role === 'USER').id },
    ]);
  });
};
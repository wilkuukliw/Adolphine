exports.seed = function(knex) {
  return knex('roles').select().then(roles => {
    return knex('users').insert([
      { username: 'admin', password: '$2b$12$rq946DxFBF/slXG2GYIBOO1AgUDRPFtxnEV0h11sOIFxjgu.ngrSi', role_id: roles.find(role => role.role === 'ADMIN').id },
      { username: 'user', password: '$2b$12$rq946DxFBF/slXG2GYIBOO1AgUDRPFtxnEV0h11sOIFxjgu.ngrSi', role_id: roles.find(role => role.role === 'USER').id },
    ]);
  });
};
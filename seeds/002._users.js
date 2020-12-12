exports.seed = function (knex) {
  return knex('roles').select().then(roles => {
    return knex('users').insert([
      { username: 'admin', password: '$2b$12$rq946DxFBF/slXG2GYIBOO1AgUDRPFtxnEV0h11sOIFxjgu.ngrSi', email: 'anna.maria.wilczek@gmail.com', role_id: roles.find(role => role.role === 'ADMIN').id, uuid: 'a01b790e-d8ab-43d2-80e9-ee6fbb974c55' },
      { username: 'user', password: '$2b$12$rq946DxFBF/slXG2GYIBOO1AgUDRPFtxnEV0h11sOIFxjgu.ngrSi', email: 'anna.maria.wilczek@gmail.com', role_id: roles.find(role => role.role === 'USER').id, uuid: 'b549cd77-1e96-4592-904a-cd6247470bb2' }
    ])
  })
}

exports.seed = function(knex) {
    return knex('roles').insert([
        { role: 'ADMIN' },
        { role: 'USER' },
        { role: 'ANONYMOUS' }
    ]);
};
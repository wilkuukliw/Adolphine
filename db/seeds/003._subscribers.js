exports.seed = function(knex) {
    return knex('subscribers').insert([
        { email: 'anna.maria.wilczek@gmail.com' }
    ])
}
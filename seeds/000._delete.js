exports.seed = function(knex) {
    return knex('users').del()
        .then(() => {
            return knex('reminders').del();
        }).then(() => {
            return knex('subscribers').del();
        }).then(() => {
            return knex('users').del();
        }).then(() => {
            return knex('roles').del();
        });
};
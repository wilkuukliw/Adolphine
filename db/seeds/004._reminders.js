exports.seed = function(knex) {
    return knex('users').select().then(users => {
        return knex('reminders').insert([
            { email_body: 'sample text to be sent over to dear users', send_at: '2020-12-12 12:12:12', created_by: users.find(user => user.id === 1).username }
        ])
    })
}
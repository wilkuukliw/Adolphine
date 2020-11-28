exports.seed = function(knex) {
 
  return knex('users').select().then(users => {
      return knex('reminders').insert([

     { item_1: "a", item_2: "b", item_3: "c", item_4: "d", item_5: "e", send_at: "2020-12-12 12:12:12", user_id: users.find(user => user.username === 'admin').id},
  ]);
});

};
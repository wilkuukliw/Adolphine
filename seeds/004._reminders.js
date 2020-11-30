exports.seed = function(knex) {
 
  return knex('users').select().then(users => {
      return knex('reminders').insert([

     { item_1: "a", item_2: "b", item_3: "c", item_4: "d", item_5: "e", send_at: "2020-12-12 12:12:12", created_by: users.find(user => user.id === 1).username},
  ]);
});

};
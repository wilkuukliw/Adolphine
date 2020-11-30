
exports.up = function(knex) {
    return knex.schema
    .createTable('roles', (table) => {
        table.increments('id').notNullable();
        table.string('role').unique().notNullable();
    })

    .createTable('users', (table) => {
        table.increments('id').notNullable();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
        table.integer('role_id').unsigned().notNullable();
        table.foreign('role_id').references('roles.id');
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    })

    .createTable('reminders', (table) => {
        table.increments('id').notNullable();
        table.string('item_1').notNullable();
        table.string('item_2');
        table.string('item_3');
        table.string('item_4');
        table.string('item_5');
        table.string('created_by').notNullable();
        table.foreign('created_by').references('users.username');
        table.dateTime('send_at').notNullable();
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.boolean("is_deleted").nullable();   //to be used for reminders crud
        table.dateTime("deleted_at").nullable();
    })

    .createTable('subscribers', (table) => {
        table.increments('id').notNullable();
        table.string('email').notNullable();
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('reminders')
    .dropTableIfExists('subscribers')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
};

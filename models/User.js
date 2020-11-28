const { Model } = require('objection');

const Reminder = require('./Reminder.js')
const Role = require('./Role.js')


class User extends Model {
    
    static tableName = 'users'

    static relationMappings = { 
        reminders: {
            relation: Model.HasManyRelation, 
            modelClass: Reminder,
            join: {
                from: 'users.reminderId',
                to: 'reminders.userId'
            }
        },

        role: {
            relation: Model.BelongsToOneRelation,   // bi-directional
            modelClass: Role,
            join: {
                from: 'users.roleId',
                to: 'roles.id'
            }
    }
}
}
module.exports = User;
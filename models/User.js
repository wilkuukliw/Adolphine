const { Model } = require('objection')

const Role = require('./Role.js');
const Reminder = require('./Reminder.js');

class User extends Model {
    static tableName = 'users'

    static relationMappings = {
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: Role,
            join: {
                from: 'users.roleId',
                to: 'roles.id'
            }
        },

        reminders: {
            relation: Model.HasManyRelation,
            modelClass: Reminder,
            join: {
                from: 'users.reminderId',
                to: 'reminders.id'
            }
        },
    }
}

module.exports = User
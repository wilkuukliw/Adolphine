const { Model } = require('objection');

const User = require('./User.js')

class Reminder extends Model {
    
    static tableName = 'reminders';

    static relationMappings = { 
        users: {
            relation: Model.HasManyRelation,
            modelClass: User,
            join: {
                from: 'reminders.userId',
                to: 'users.id'
            }
        }
    }
}

module.exports = Reminder;
const { Model } = require('objection');

const User = require('./User.js')

class Reminder extends Model {
    
    static tableName = 'reminders';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'reminders.userId',
                to: 'users.id'
            }
        }
    }
}

module.exports = Reminder;
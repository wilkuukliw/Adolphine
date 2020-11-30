const { Model } = require('objection');

const User = require('./User.js')

class Reminder extends Model {
    
    static tableName = 'reminders';

    static relationMappings = {

        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'reminders.createdBy',
                to: 'users.username'
        }
    }
    }
}

module.exports = Reminder;
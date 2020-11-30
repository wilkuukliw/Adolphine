const { Model } = require('objection')

class User extends Model {
    static tableName = 'users'

}

module.exports = User
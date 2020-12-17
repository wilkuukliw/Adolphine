const { Model } = require('objection');

class Subscriber extends Model {
    static tableName = 'subscribers';
}

module.exports = Subscriber;
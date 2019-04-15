const db = require('../models');

module.exports = {
     async getAll() {
        db.Tasks.findAll()
    }
}
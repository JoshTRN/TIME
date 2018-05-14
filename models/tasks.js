

module.exports = function(sequelize, Datatypes) {
    var UserTasks = sequelize.define(username + '_tasks', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.TEXT
        },
        startTime: {
            type: Sequelize.STRING
        },
        goalDuration: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false
    });


}
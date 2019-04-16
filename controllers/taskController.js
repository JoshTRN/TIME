const { Tasks, User } = require("../models");

module.exports = {
    async getAll(user) {
        const info = User.findOne({
            where: {
                username: user
            }
        });

        const tasks = Tasks.findAll({
            where: {
                UserUsername: user
            }
        });
        return Promise.all([info, tasks]);
    },

    async getComplete(user) {
        return await Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: user,
                completed: true
            },
            group: "category"
        });
    },
    async getCategories(user) {
        return await Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: user
            },
            group: "category"
        });
    },
    async getIncomplete(user) {
        return await Tasks.findAndCountAll({
            attributes: ["category"],
            where: {
                UserUsername: user,
                completed: false
            },
            group: "category"
        });
    },
    updateStatus(id, user) {
        Tasks.update(
            {
                completed: true
            },
            {
                where: {
                    id,
                    UserUsername: user
                }
            }
        );
    },
    deleteTask(id, user) {
        
    }
};

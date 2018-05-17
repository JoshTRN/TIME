module.exports = function (sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    category: DataTypes.STRING,
    taskName: DataTypes.STRING,
    description: DataTypes.TEXT,
    start: DataTypes.STRING,
    duration: DataTypes.STRING,
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
      timestamps: false
    });

  Tasks.associate = function (models) {
    Tasks.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    })
  }
  return Tasks;
};
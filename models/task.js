module.exports = function (sequelize, DataTypes) {
  var test = sequelize.import('./user.js')
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
  console.log("hello", models.User)
  Tasks.belongsTo(models.User, {
    foreignKey: {
      allowNull: true
    }
  })
}
// Tasks.belongsTo(user);
return Tasks;
  };
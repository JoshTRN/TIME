module.exports = function(sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
      id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
      }
    });
  
    return Tasks;
  };
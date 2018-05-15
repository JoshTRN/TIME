module.exports = function(sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
      id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
      }
    }, {
      timestamps: false
    });

    console.log('associate')
    
    Tasks.associate = function(models) {
      console.log(models.User)
      Tasks.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  
    return Tasks;
  };
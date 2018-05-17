module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    picURL: DataTypes.STRING
  }, {
      timestamps: false
    });

  User.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Tasks);
  }
  return User;
};
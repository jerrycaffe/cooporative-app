'use strict';
module.exports = (sequelize, DataTypes) => {
  const saving = sequelize.define('saving', {
    balance: DataTypes.STRING
  }, {});
  saving.associate = function(models) {
    // associations can be defined here
  };
  return saving;
};
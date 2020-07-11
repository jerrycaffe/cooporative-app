'use strict';
module.exports = (sequelize, DataTypes) => {
  const complaint = sequelize.define('complaint', {
    message: DataTypes.STRING
  }, {});
  complaint.associate = function(models) {
    // associations can be defined here
  };
  return complaint;
};
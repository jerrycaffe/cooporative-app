'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchase = sequelize.define('purchase', {
    item_id: DataTypes.INTEGER
  }, {});
  purchase.associate = function(models) {
    // associations can be defined here
  };
  return purchase;
};
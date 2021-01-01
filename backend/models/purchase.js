'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchase = sequelize.define('purchase', {
    item_id: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.INTEGER
    },
    approved_by: {
      type: DataTypes.INTEGER
    },
  date_approved: {
      type: DataTypes.DATE
    },
  }, {});
  purchase.associate = function(models) {
    // associations can be defined here
    purchase.belongsTo(models.user, {
      as: 'purchaser',
      foreignKey: 'user_id'
    });
    purchase.belongsTo(models.user, {
      as: 'approval',
      foreignKey: 'approved_by'
    });
  };
  return purchase;
};
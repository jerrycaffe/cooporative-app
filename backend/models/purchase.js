'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchase = sequelize.define('purchase', {
    item_id: DataTypes.INTEGER,
    staff_id: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    unit_price: {
      type: DataTypes.STRING
    },
    total_cost: {
      type: DataTypes.STRING
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
    purchase.belongsTo(models.staff, {
      as: 'purchaser',
      foreignKey: 'staff_id'
    });
    purchase.belongsTo(models.staff, {
      as: 'approval',
      foreignKey: 'approved_by'
    });
  };
  return purchase;
};
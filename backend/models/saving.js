'use strict';
module.exports = (sequelize, DataTypes) => {
  const saving = sequelize.define('saving', {
    balance: DataTypes.STRING,
    staff_id: {
      type: DataTypes.INTEGER,
    },
    amount_saved: {
      type: DataTypes.DECIMAL
    },
    posted_by: {
      type: DataTypes.INTEGER,
      },
  }, {});
  saving.associate = function(models) {
    // associations can be defined here
    saving.belongsTo(models.staff, {
      as: 'saved_by',
      foreignKey: 'staff_id'
    })
    saving.belongsTo(models.staff, {
      as: 'processed_by',
      foreignKey: 'posted_by'
    });
  };
  return saving;
};
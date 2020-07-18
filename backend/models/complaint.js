'use strict';
module.exports = (sequelize, DataTypes) => {
  const complaint = sequelize.define('complaint', {
    message: DataTypes.STRING,
    staff_id: {
      type: DataTypes.INTEGER
    },
    message: {
      type: DataTypes.STRING
    },
    addressed_by: {
      type: DataTypes.INTEGER
    }
  }, {});
  complaint.associate = function(models) {
    // associations can be defined here
    complaint.belongsTo(models.staff, {
      as: 'complainant',
      foreignKey: 'staff_id'
    });
    complaint.belongsTo(models.staff, {
      as: 'treeted_by',
      foreignKey: 'addressed_by'
    });
  };
  return complaint;
};
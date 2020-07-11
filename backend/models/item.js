'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    img_url: DataTypes.STRING,
    
    added_by: {
      type: DataTypes.INTEGER,
     },
    unit: {
      type: DataTypes.INTEGER
    },
    unit_amount: {
      type: DataTypes.DECIMAL
    },
    total_amount: {
      type: DataTypes.DECIMAL
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Available"
    },
  }, {});
  item.associate = function(models) {
    // associations can be defined here
    item.belongsTo(models.staff, {
      foreignKey: 'added_by'
    });
  };
  return item;
};
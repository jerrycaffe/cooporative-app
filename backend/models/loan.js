'use strict';
module.exports = (sequelize, DataTypes) => {
  const loan = sequelize.define('loan', {
   
    staff_id: {
      type: DataTypes.INTEGER
      },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    interest: {
      type: DataTypes.DECIMAL
    },
    repayment: {
      type: DataTypes.DECIMAL
    },
    date_approved: {
      type: DataTypes.DATE
    },
    approved_by: {
      type: DataTypes.INTEGER,
      },
    balance: {
      type: DataTypes.DECIMAL
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'PENDING'
    }
  }, {});
  loan.associate = function(models) {
    // associations can be defined here
    loan.belongsTo(models.staff, {
      as: 'owner',
      foreignKey: 'staff_id'
    });
    loan.belongsTo(models.staff, {
      as: 'approver',
      foreignKey: 'approved_by'
    });
  };
  return loan;
};
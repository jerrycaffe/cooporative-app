"use strict";
module.exports = (sequelize, DataTypes) => {
  const loan = sequelize.define(
    "loan",
    {
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
      date_treeted: {
        type: DataTypes.DATE
      },
      treeted_by: {
        type: DataTypes.INTEGER
      },
      balance: {
        type: DataTypes.DECIMAL
      },
      purpose: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin_comment: {
        type: DataTypes.STRING
      },

      status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING"
      }
    },
    {}
  );
  loan.associate = function(models) {
    // associations can be defined here
    loan.belongsTo(models.staff, {
      as: "owner",
      foreignKey: "staff_id"
    });
    loan.belongsTo(models.staff, {
      as: "approver",
      foreignKey: "treeted_by"
    });
  };
  return loan;
};

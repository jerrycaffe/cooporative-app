'use strict';
module.exports = (sequelize, DataTypes) => {
  const loan = sequelize.define('loan', {
    amount: DataTypes.STRING
  }, {});
  loan.associate = function(models) {
    // associations can be defined here
  };
  return loan;
};
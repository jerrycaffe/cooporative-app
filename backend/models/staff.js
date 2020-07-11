"use strict";
module.exports = (sequelize, DataTypes) => {
  const staff = sequelize.define(
    "staff",
    {
      firstname: { type: DataTypes.STRING(50), allowNull: false },
      lastname: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      password: {type: DataTypes.STRING(50), allowNull: false},
      dob: { type: DataTypes.DATEONLY },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      address: { type: DataTypes.STRING(50) },
      img_url: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING(20), defaultValue: "user" },
      employed_as: { type: DataTypes.STRING(25) },
      branch: { type: DataTypes.STRING(50) },
      monthly_savings: { type: DataTypes.STRING },
      account_number: { type: DataTypes.STRING },
      bank_name: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING(20), defaultValue: "active" }
    },

    {}
  );
  staff.associate = function(models) {
    // associations can be defined here
    staff.hasMany(models.saving);
    staff.hasMany(models.item);
    staff.hasMany(models.purchase);
    staff.hasMany(models.loan);
    staff.hasMany(models.complaint);
  };
  return staff;
};

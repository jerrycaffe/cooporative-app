"use strict";
module.exports = (sequelize, DataTypes) => {
  const staff = sequelize.define(
    "staff",
    {
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: {type: DataTypes.STRING, allowNull: false},
      dob: { type: DataTypes.DATEONLY },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: { type: DataTypes.STRING },
      img_url: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: "user" },
      employed_as: { type: DataTypes.STRING },
      branch: { type: DataTypes.STRING },
      monthly_savings: { type: DataTypes.STRING },
      account_number: { type: DataTypes.STRING },
      bank_name: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, defaultValue: "active" }
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

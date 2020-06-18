'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('staffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(50)
      },
      img_url: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING(20),
        defaultValue: "user"
      },
      employed_as: {
        type: Sequelize.STRING(25)
      },
      branch: {
        type: Sequelize.STRING(50)
      },
      monthly_savings: {
        type: Sequelize.STRING
      },
      account_number: {
        type: Sequelize.STRING
      },
      bank_name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING(20),
        defaultValue: "active"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('staffs');
  }
};
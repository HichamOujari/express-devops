const Sequelize = require("sequelize");
const UserEntity = require("./user");
const CONFIG = require("../config");

const sequelize = new Sequelize(
  CONFIG.db_name,
  CONFIG.db_username,
  CONFIG.db_password,
  {
    host: CONFIG.host,
    dialect: "mysql",
  }
);

const User = sequelize.define("User", UserEntity);
sequelize.sync();
module.exports = {
  User,
};

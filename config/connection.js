const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

// JAWS_DB is our enviromental variable to make our server available in the cloud
// This will be used when our server isn't running locally
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If we are running locally, the use Local Host
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
      port: 3306,
    }
  );
}

// Exporting the connection
module.exports = sequelize;

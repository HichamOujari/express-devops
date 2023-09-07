module.exports = {
  host: process.env.DB_HOST || "localhost",
  db_name: process.env.DB_NAME || "test",
  db_username: 'root',
  db_password: process.env.DB_PASSWORD || "",
};

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.port || 3000;
const cluster = require("cluster");
const cpus = require("os").cpus().length;
const mysql = require("mysql2/promise");
const { host, db_password, db_name } = require("./config");

async function main() {
  if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) cluster.fork();

    cluster.on("exit", () => cluster.fork());
  } else {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    try {
      const connection = await mysql.createConnection({
        host,
        port: 3306,
        user: "root",
        password: db_password,
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${db_name}\`;`);
    } catch (err) {
      console.error(err);
    }

    const userController = require("./controllers/users");
    app.get("/", (req, res) => {
      res.status(200).send("Application running successfully.");
    });
    app.get("/users", userController.getAll);
    app.get("/users/:id", userController.getById);
    app.post("/users", userController.addUser);

    app.listen(port, () => {
      console.log(`The Application is running in port ${port}`);
    });
  }
}

main();

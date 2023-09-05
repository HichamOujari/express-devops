const express = require("express");
const app = express();
const port = 3000;

const cluster = require("cluster");
const cpus = require("os").cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) cluster.fork();

  cluster.on("exit", () => cluster.fork());
} else {
  app.get("/", (req, res) => {
    res.status(200).send({
      done: true,
    });
  });

  app.get("/blocking", (req, res) => {
    let i = 0;
    while (i < 2000000000) i++;
    res.status(200).send("blocking");
  });

  app.get("/non-blocking", (req, res) => {
    res.status(200).send("non-blocking");
  });

  app.listen(port, () => {
    console.log(`The Application is running in port ${port}`);
  });
}

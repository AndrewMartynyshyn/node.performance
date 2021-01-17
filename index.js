const cluster = require("cluster");

//if the file is being executed in master mode
if (cluster.isMaster) {
  cluster.fork();
} else {
  const express = require("express");

  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("hi there!");
  });

  app.listen(3000, () => console.log("listening port 3000"));
}

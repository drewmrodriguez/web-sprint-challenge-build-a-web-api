const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const actionsRouter = require("./actions/actions-router.js");
const projectsRouter = require("./projects/projects-router.js");
const helmet = require("helmet");

server.use(helmet());
server.use(express.json());

server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.use("/", (req, res) => {
  res.status(200).send(`<h2>API is running!</h2>`);
});

server.use((error, req, res ) => {
  error.error && console.error(error.error);
  res.status(error.status).json({ message: error.message });
});

module.exports = server;

const express = require('express');
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const cors = require("cors");
const helmet = require("helmet");
// const path = require("path");

const server = express();

server.use(express.json());
// server.use(express.static(path.join(__dirname, "client/build")));
server.use(cors());
server.use(helmet());
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

//SANITY CHECK ENDPOINT
server.get("/", (req, res, next)=>{
    res.json({message: "API Up"});
});

//If front end deployed on heroku, will send html file
// server.use("*", (req, res)=>{
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });


module.exports = server;

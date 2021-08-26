/*
    {
        "created_by": "Bruno Brizolara",
        "created_at": "21/08/2021",
        "description": "configuration of our server",
        "modified_at": ""
    }
*/
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
require("dotenv").config();

const port = process.env.port || 3000;

server.listen(port);

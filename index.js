const express = require("express"); //Requiring the express
require("./db/conn"); //Connection 

const Pitchroute = require("./api/pitches"); // Contains all Endpoints 

const app = express();

app.use(express.json());

const port = 8081; //port for Server

app.use("/pitches", Pitchroute);

app.listen(port, () => {
  console.log("listening on port"); //Listening to the port
});

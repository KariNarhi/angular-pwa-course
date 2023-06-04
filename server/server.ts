import * as express from "express";
import { Application } from "express";
import { readAllLessons } from "./read-all-lessons.route";
import * as bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());

// REST API
app.route("/api/lessons").get(readAllLessons);

// launch an HTTP Server
app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:9000");
});

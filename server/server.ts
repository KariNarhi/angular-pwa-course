import * as express from "express";
import { Application } from "express";
import { readAllLessons } from "./read-all-lessons.route";
import { addPushSubscriber } from "./add-push-subscriber.route";
import { sendNewsletter } from "./send-newsletter.route";
import * as bodyParser from "body-parser";
import * as webPush from "web-push";

const vapidKeys = {
  publicKey:
    "BGPM_EUPB2mEuPsdMoxraXtFJD98Xf8_osoHLU5191nRB8dmaEb4CnDh8XIJaCUilVclJ6hVMtrLDnjvK6a9hdc",
  privateKey: "bLSKm_l5qrAmbCXTP6rBcMCL3IGzeJy-ffR3RTKPi7c",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app: Application = express();

app.use(bodyParser.json());

// REST API
app.route("/api/lessons").get(readAllLessons);

app.route("/api/notifications").post(addPushSubscriber);

app.route("/api/newsletter").post(sendNewsletter);

// launch an HTTP Server
app.listen(9000, () => {
  console.log("HTTP Server running at http://localhost:9000");
});

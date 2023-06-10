import { Request, Response } from "express";
import { USER_SUBSCRIPTIONS } from "./in-memory-db";

import * as webPush from "web-push";

export function sendNewsletter(req: Request, res: Response) {
  console.log("Total subscriptions", USER_SUBSCRIPTIONS.length);

  // sample notification payload
  const notificationPayload: {
    notification: Partial<Notification> & {
      vibrate: VibratePattern;
      actions: NotificationAction[];
    };
  } = {
    notification: {
      title: "Angular News",
      body: "Newsletter Available!",
      icon: "assets/main-page-logo-small-hat.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    },
  };

  Promise.all(
    USER_SUBSCRIPTIONS.map((sub) =>
      webPush.sendNotification(sub, JSON.stringify(notificationPayload))
    )
  )
    .then(() =>
      res.status(200).json({ message: "Newsletter sent succesfully" })
    )
    .catch((err) => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
}

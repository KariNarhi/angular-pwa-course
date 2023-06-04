import { Request, Response } from "express";
import { db } from "./database";

export function readAllLessons(req: Request, res: Response) {
  setTimeout(() => {
    res.status(200).json({ lessons: db.readAllLessons() });
  }, 60000);
}

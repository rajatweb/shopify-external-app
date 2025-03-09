import { Router } from "express";

const ordersRouter = Router();

ordersRouter.get("/", (req, res) => {
  res.send("Hello World");
});

ordersRouter.get("/:id", (req, res) => {
  res.send("Hello World");
});

export default ordersRouter;
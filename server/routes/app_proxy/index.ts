import { Router, Request, Response } from "express";

const proxyRouter = Router();

proxyRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default proxyRouter;
import "dotenv/config";
import express, { Request, Response } from "express";
import shopify from "./utils/shopify";
import path, { join } from "path";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { WebSocketServer } from "ws";
import { webhookHandlers } from "./webhooks/_index";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./controllers/gdpr";
import proxyRouter from "./routes/app_proxy";
import verifyProxy from "./middleware/verifyProxy";
import verifyRequest from "./middleware/verifyRequest";
import ordersRouter from "./routes/order";

const PORT = parseInt(process.env.PORT || "3000", 10);
const WS_PORT = parseInt(process.env.WS_PORT || "3001", 10);
const isDev = process.env.NODE_ENV === "development";
const app = express();

app.disable("x-powered-by");

const STATIC_PATH = isDev
  ? join(__dirname, "../client")
  : join(__dirname, "../client/dist");

// console.log(shopify);

// Shopify Webhooks
app.post(
  shopify.config.webhooks.path,
  express.text({ type: "*/*" }),
  shopify.processWebhooks({ webhookHandlers: webhookHandlers as any })
);

// Express middleware to parse JSON payloads
app.use(express.json());

// Create WebSocket server
const wss = new WebSocketServer({ port: WS_PORT });
wss.on("connection", (ws) => {
  console.log("New WebSocket connection established");

  ws.on("message", (message) => {
    console.log("Received: ", message.toString());
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

console.log(`WebSocket server running on ws://localhost:${WS_PORT}`);

async function startServer() {
  // Shopify Authentication Routes
  app.get(shopify.config.auth.path, shopify.auth.begin());
  app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    async (req, res) => {
      const { shop } = req.query;
      // Redirect to app home page after successful auth
      const host = req.query.host;
      const redirectUrl = `/?shop=${shop}&host=${host}`;

      shopify.redirectOutOfApp({
        req,
        res,
        redirectUri: redirectUrl,
        shop: shop as string,
      });
    }
  );

  // Protect API routes with Shopify auth middleware
  app.use("/api/*", shopify.validateAuthenticatedSession());

  app.use("/api/proxy_route", verifyProxy, proxyRouter);
  app.use("/api/orders", verifyRequest, ordersRouter);

  app.post("/api/gdpr/:topic", async (req: Request, res: Response) => {
    const { body } = req;
    const { topic } = req.params;
    const shop = req.body.shop_domain;

    console.warn(`--> GDPR request for ${shop} / ${topic} recieved.`);

    let response;
    switch (topic) {
      case "customers_data_request":
        response = await customerDataRequest(topic, shop, body);
        break;
      case "customers_redact":
        response = await customerRedact(topic, shop, body);
        break;
      case "shop_redact":
        response = await shopRedact(topic, shop, body);
        break;
      default:
        console.error(
          "--> Congratulations on breaking the GDPR route! Here's the topic that broke it: ",
          topic
        );
        response = "broken";
        break;
    }

    if (response) {
      res.status(200).send();
    } else {
      res.status(403).send("An error occured");
    }
  });

  // Shopify CSP headers
  app.use(shopify.cspHeaders());

  if (isDev) {
    const vite = await createViteServer({
      root: path.resolve(process.cwd(), "client"),
      server: {
        middlewareMode: true,
        hmr: {
          server: app.listen(PORT, () => {
            console.log(`Dev server running on http://localhost:${PORT}`);
          }),
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res) => {
      const url = req.originalUrl;
      let template = fs.readFileSync(
        path.resolve(process.cwd(), "client", "index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    });
  } else {
    // Serve static files in production
    app.use(serveStatic(STATIC_PATH, { index: false }));

    // Serve index.html for client-side routing
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) return;
      res.sendFile(join(STATIC_PATH, "index.html"));
    });
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }
}

startServer();

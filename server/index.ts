import "dotenv/config";
import express from "express";
import shopify from "../utils/shopify";
import path, { join } from "path";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import { WebSocketServer } from "ws";

const PORT = parseInt(process.env.PORT || "3000", 10);
const WS_PORT = parseInt(process.env.WS_PORT || "3001", 10);
const isDev = process.env.NODE_ENV === "development";
const app = express();

const STATIC_PATH = isDev
  ? join(__dirname, "../client")
  : join(__dirname, "../client/dist");

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
    (req, res) => {
      res.redirect("/");
    }
  );

  // Shopify Webhooks
  app.post(
    shopify.config.webhooks.path,
    shopify.processWebhooks({ webhookHandlers: {} })
  );

  // Protect API routes with Shopify auth middleware
  app.use("/api/*", shopify.validateAuthenticatedSession());

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

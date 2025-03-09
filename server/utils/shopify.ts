import "dotenv/config";

import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";

const shopify = shopifyApp({
  api: {
    apiKey: process.env.SHOPIFY_API_KEY || "",
    apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
    scopes: process.env.SHOPIFY_API_SCOPES?.split(",") || ["read_orders"],
    hostScheme: "https",
    hostName:
      process.env.SHOPIFY_APP_URL?.replace("https://", "") ||
      `localhost:${process.env.PORT}`,
    isEmbeddedApp: false,
    forceRedirect: false,
    apiVersion: LATEST_API_VERSION,
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
});

export const webhooksTopic = [
  {
    topics: ["app/uninstalled"],
    url: "/api/webhooks/app_uninstalled",
  },
  {
    topics: [
      "orders/create",
      "orders/updated",
      "orders/cancelled",
      "orders/fulfilled",
    ],
    url: "/api/webhooks/orders",
  },
];

export default shopify;

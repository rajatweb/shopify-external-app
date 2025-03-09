import shopify from "../utils/shopify";
import { DeliveryMethod } from "@shopify/shopify-api";

const createWebhookHandler = () => ({
  deliveryMethod: DeliveryMethod.Http,
  callbackUrl: shopify.config.webhooks.path,
  callback: async (topic: string, shop: string, body: string) => {
    console.log(topic, shop, body);
    const payload = JSON.parse(body);
    // Payload has the following shape:
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "{shop}.myshopify.com",
    //   "orders_requested": [
    //     299938,
    //     280263,
    //     220458
    //   ],
    //   "customer": {
    //     "id": 191167,
    //     "email": "john@example.com",
    //     "phone": "555-625-1199"
    //   },
    //   "data_request": {
    //     "id": 9999
    //   }
    // }

    // Payload has the following shape:
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "{shop}.myshopify.com",
    //   "customer": {
    //     "id": 191167,
    //     "email": "john@example.com",
    //     "phone": "555-625-1199"
    //   },
    //   "orders_to_redact": [
    //     299938,
    //     280263,
    //     220458
    //   ]
    // }

    // Payload has the following shape:
    // {
    //   "shop_id": 954889,
    //   "shop_domain": "{shop}.myshopify.com"
    // }
  },
});

const orderTopics = [
  "ORDERS_CREATE",
  "ORDERS_UPDATE",
  "ORDERS_CANCEL",
  "ORDERS_FULFILLED",
] as const;

export const webhookHandlers = {
  APP_UNINSTALLED: createWebhookHandler(),
  /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */
  CUSTOMERS_DATA_REQUEST: createWebhookHandler(),
  /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: createWebhookHandler(),
  /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * privacy webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: createWebhookHandler(),
  ...Object.fromEntries(
    orderTopics.map((topic) => [topic, createWebhookHandler()])
  ),
} as const;

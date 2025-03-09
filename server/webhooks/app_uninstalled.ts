import { prisma } from "../utils/prisma/index";

const appUninstallHandler = async (
  topic: string,
  shop: string,
  webhookRequestBody: any,
  webhookId: string,
  apiVersion: string
) => {
  console.log("appUninstallHandler", topic);

  try {
    // Parse the webhook request body
    const webhookBody = JSON.parse(webhookRequestBody);

    const isStore = await prisma.store.findUnique({
      where: {
        shop: shop,
      },
    });

    if (isStore) {
      // Update store status and delete sessions in a transaction
      await prisma.$transaction([
        prisma.store.update({
          where: { shop: shop },
          data: { isActive: false },
        }),
        prisma.session.deleteMany({
          where: { shop: shop },
        }),
      ]);
      console.log(`Successfully processed uninstall for shop: ${shop}`);
    } else {
      console.log(`Store not found for shop: ${shop}`);
    }
  } catch (error) {
    console.error("Error handling app uninstall:", error);
    throw new Error(`Failed to process app uninstall for shop: ${shop}`);
  }
};

export default appUninstallHandler;

import { defineWalletSetup } from "@synthetixio/synpress";
import { getExtensionId, MetaMask } from "@synthetixio/synpress/playwright";
import dotenv from "dotenv";

if (!process.env.CI) {
  dotenv.config();
}

const SEED_PHRASE = process.env.SEED_PHRASE;
const PASSWORD = process.env.PASSWORD;

export default defineWalletSetup(PASSWORD!, async (context, walletPage) => {
  if (!SEED_PHRASE || !PASSWORD) {
    throw new Error(
      "Ensure your .env file exists locally or Secrets are set in GitHub."
    );
  }

  const extensionId = await getExtensionId(context, "MetaMask");
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);
});

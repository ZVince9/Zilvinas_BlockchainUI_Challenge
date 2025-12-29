import { defineWalletSetup } from "@synthetixio/synpress";
import { getExtensionId, MetaMask } from "@synthetixio/synpress/playwright";
import dotenv from "dotenv";

dotenv.config();

// change SEED_PHRASE and PASSWORD according to your wallet information
// const SEED_PHRASE =
//   "breeze head potato tuna tail luggage initial bring visa dinner own chest";
// const PASSWORD = "Testing1234?";
const SEED_PHRASE =
  process.env.SEED_PHRASE || "test test test test test test test test test";
const PASSWORD = process.env.PASSWORD || "TEST";

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, "MetaMask");
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);
});

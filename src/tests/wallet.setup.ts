import { defineWalletSetup } from "@synthetixio/synpress";
import { getExtensionId, MetaMask } from "@synthetixio/synpress/playwright";
import "dotenv/config";

// change SEED_PHRASE and PASSWORD according to your wallet information
const SEED_PHRASE = "1 2 3 4 5 6 7 8 9 10 11 12";
const PASSWORD = "pass";

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const extensionId = await getExtensionId(context, "MetaMask");
  const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

  await metamask.importWallet(SEED_PHRASE);
});

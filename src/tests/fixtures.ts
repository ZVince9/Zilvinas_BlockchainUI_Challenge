import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import walletSetup from "./wallet.setup";
import { BasePage } from "../tests/pages/BasePage";
import { WidgetPage } from "./pages/WidgetPage";

export const test = testWithSynpress(metaMaskFixtures(walletSetup)).extend<{
  basePage: BasePage;
  widgetPage: WidgetPage;
  metamask: MetaMask;
}>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  widgetPage: async ({ page }, use) => {
    await use(new WidgetPage(page));
  },

  metamask: async ({ context, metamaskPage, extensionId }, use) => {
    const metamask = new MetaMask(
      context,
      metamaskPage,
      walletSetup.walletPassword,
      extensionId
    );
    await use(metamask);
  },
});

export { expect } from "@playwright/test";

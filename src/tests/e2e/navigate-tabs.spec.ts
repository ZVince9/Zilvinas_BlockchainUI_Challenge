import { test, expect } from "../fixtures";

test.describe("Jumper Exchange - Navigation Tests", () => {
  test("Full Navigation Journey", async ({ metamask, widgetPage }) => {
    await test.step("Connect Wallet", async () => {
      await widgetPage.navigate();
      await widgetPage.clickConnect();
      await widgetPage.selectWalletToUse("MetaMask");
      await metamask.connectToDapp();
      await widgetPage.verifyWalletConnected();
    });

    await test.step("Navigate through tabs", async () => {
      await widgetPage.switchTab("navbar-portfolio-button");
      await widgetPage.switchTab("navbar-missions-button");
      await widgetPage.switchTab("navbar-earn-button");
      await widgetPage.switchTab("navbar-exchange-button");
    });

    await test.step("Navigate through Learn menu", async () => {
      await widgetPage.openBurger();
      await widgetPage.navigateToLearn();
    });

    await test.step("Select Discord from menu", async () => {
      const discordTab = await widgetPage.openDiscord();

      await expect(discordTab).toHaveURL(/discord\.com/);
    });
  });
});

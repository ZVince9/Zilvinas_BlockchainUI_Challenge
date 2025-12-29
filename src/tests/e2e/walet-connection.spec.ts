import { test } from "../fixtures";

test.describe("Functional Testing - Happy Path", () => {
  test("should successfully connect wallet", async ({
    widgetPage,
    metamask,
  }) => {
    await widgetPage.navigate();
    await widgetPage.clickConnect();
    await widgetPage.selectWalletToUse("MetaMask");
    await metamask.connectToDapp();
    await widgetPage.verifyWalletConnected();
  });
});

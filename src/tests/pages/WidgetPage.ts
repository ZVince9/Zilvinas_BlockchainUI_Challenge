import { BasePage } from "./BasePage";
import { expect, type Locator, type Page } from "@playwright/test";

export class WidgetPage extends BasePage {
  private readonly connectButton: Locator;
  private readonly walletModal: Locator;
  private readonly menuBurger: Locator;

  constructor(page: Page) {
    super(page);
    this.connectButton = this.page.getByRole("button", {
      name: "Connect",
      exact: true,
    });
    this.walletModal = this.page.locator("#widget-wallet-modal-content");
    this.menuBurger = this.page.locator("#main-burger-menu-button");
  }

  async clickConnect() {
    await this.connectButton.first().click();
  }

  async selectWalletToUse(walletName: string) {
    await expect(this.walletModal).toBeVisible();
    const specificWallet = this.walletModal.getByText(walletName, {
      exact: true,
    });
    await specificWallet.click();
  }

  async verifyWalletConnected() {
    const walletAddress = this.page
      .getByRole("button")
      .filter({ hasText: /^0x[a-fA-F0-9]{3}/ });
    await expect(walletAddress).toBeVisible({ timeout: 15000 });
  }

  async switchTab(
    tabName:
      | "navbar-exchange-button"
      | "navbar-portfolio-button"
      | "navbar-missions-button"
      | "navbar-earn-button"
  ) {
    await this.page.getByTestId(tabName).click({ timeout: 7000 });
    const expectValue = tabName.replace("navbar-", "").replace("-button", "");

    await expect(this.page).toHaveURL(new RegExp(expectValue));
    await this.page.waitForTimeout(500);
  }

  async navigateToLearn() {
    await this.page.getByRole("menuitem", { name: "Learn" }).click();
    await expect(this.page).toHaveURL(/learn/);
  }

  async openBurger() {
    await this.menuBurger.click();
    await this.page.waitForTimeout(500);
  }

  async openDiscord() {
    await this.menuBurger.first().click();

    const pagePromise = this.page.context().waitForEvent("page");

    await this.page.getByLabel("Discord social link").click();

    const discordPage = await pagePromise;
    await discordPage.waitForLoadState();

    return discordPage;
  }
}

// src/tests/pages/BasePage.ts
import type { Page } from "@playwright/test"; // Use 'import type' here

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = "/") {
    await this.page.goto(path);
  }
}

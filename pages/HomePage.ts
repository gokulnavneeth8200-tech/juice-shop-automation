import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly accountButton: Locator;
  readonly loginMenuItem: Locator;
  readonly myPaymentsMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.getByRole('button', { name: 'Show/hide account menu' });
    this.loginMenuItem = page.getByRole('menuitem', { name: 'Go to login page' });
    this.myPaymentsMenuItem = page.getByRole('menuitem', { name: /My Payments|Payment Methods/i });
  }

  async navigateToLogin() {
    await this.accountButton.click();
    await this.loginMenuItem.click();
  }

  async navigateToPayments() {
    await this.accountButton.click();
    await this.myPaymentsMenuItem.click();
  }
}
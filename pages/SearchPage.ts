import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly addToBasketButtons: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('mat-card');
    this.addToBasketButtons = page.getByText('Add to Basket');
  }

  async addFirstProductToBasket() {
    // Get the first add to basket button and click it
    const firstAddButton = this.addToBasketButtons.first();
    await firstAddButton.waitFor({ state: 'visible', timeout: 10000 });
    await firstAddButton.click();
    await this.page.waitForTimeout(1000);
  }

  async navigateToBasket() {
    // Click on basket icon or link
    await this.page.getByText('Your Basket').click();
    await this.page.waitForLoadState('networkidle');
  }
}

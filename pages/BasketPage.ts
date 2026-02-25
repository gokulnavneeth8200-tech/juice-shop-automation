import { Page, Locator } from '@playwright/test';

export class BasketPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly basketItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator("//button[@id='checkoutButton']//span[@class='mat-mdc-button-touch-target']");
    this.basketItems = page.getByText('Your Basket');
  }

  async proceedToCheckout() {
    await this.checkoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.checkoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyItemsInBasket() {
    const itemCount = await this.basketItems.count();
    return itemCount > 0;
  }
}

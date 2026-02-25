import { Page, Locator } from '@playwright/test';

export class SelectAddressPage {
  readonly page: Page;
  readonly addressRadioButtons: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressRadioButtons = page.locator('input[type="radio"]');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async selectFirstAddress() {
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    
    // Select the first radio button
    const firstRadio = this.addressRadioButtons.first();
    await firstRadio.waitFor({ state: 'visible', timeout: 10000 });
    await firstRadio.click();
    await this.page.waitForTimeout(500);
  }

  async proceedToContinue() {
    // Wait for page to update after radio selection
    await this.page.waitForTimeout(2000);
    
    // Try multiple selectors for the continue button
    const continueBtn = this.page.locator('button:has-text("Continue"), button:has-text("continue"), [mat-button]:has-text("Continue")').first();
    await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await continueBtn.click();
    await this.page.waitForLoadState('networkidle');
  }
}

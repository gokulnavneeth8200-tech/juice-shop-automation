import { Page, Locator } from '@playwright/test';

export class DeliveryMethodPage {
  readonly page: Page;
  readonly deliveryRadioButtons: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deliveryRadioButtons = page.locator('input[type="radio"]');
    this.continueButton = page.locator('button:has-text("Continue"), button:has-text("continue"), [mat-button]:has-text("Continue")').first();
  }

  async selectFirstDeliveryMethod() {
    // Wait for delivery options to be available
    await this.deliveryRadioButtons.first().waitFor({ state: 'visible', timeout: 10000 });
    
    // Select the first delivery method radio button
    const firstRadio = this.deliveryRadioButtons.first();
    await firstRadio.click();
    
    // Wait a brief moment for selection to register
    await this.page.waitForTimeout(500);
  }

  async proceedToContinue() {
    // Wait for page to update and continue button to be available
    try {
      await this.continueButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.continueButton.click();
    } catch {
      // Try alternative selectors for the continue button
      const altContinueButton = this.page.locator('button').filter({ hasText: /continue/i }).first();
      await altContinueButton.waitFor({ state: 'visible', timeout: 5000 });
      await altContinueButton.click();
    }
    await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  }
}

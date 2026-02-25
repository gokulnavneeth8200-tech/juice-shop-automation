import { Page, Locator } from '@playwright/test';

export class PaymentPage {
  readonly page: Page;
  readonly addNewCardButton: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryMonthDropdown: Locator;
  readonly expiryYearDropdown: Locator;
  readonly submitButton: Locator;
  readonly continueButton: Locator;
  readonly placeOrderButton: Locator;
  readonly firstPaymentRadio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewCardButton = page.getByRole('button', { name: /Add new card/i });
    this.nameOnCardInput = page.getByLabel('Name');
    this.cardNumberInput = page.getByLabel('Card Number');
    this.expiryMonthDropdown = page.getByLabel('Expiry Month');
    this.expiryYearDropdown = page.getByLabel('Expiry Year');
    this.submitButton = page.getByRole('button', { name: /Submit/i });
    this.continueButton = page.getByRole('button', { name: /Proceed to review|Continue/i });
    this.placeOrderButton = page.getByRole('button', { name: /Place your order|Checkout/i });
    this.firstPaymentRadio = page.locator('mat-row').first().locator('mat-radio-button');
  }

  async clickAddNewCard() {
    await this.addNewCardButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addNewCardButton.click();
    await this.page.waitForTimeout(1000);
  }

  async fillCardDetails(
    nameOnCard: string,
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string
  ) {
    // Fill name on card
    await this.nameOnCardInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.nameOnCardInput.fill(nameOnCard);
    await this.page.waitForTimeout(500);

    // Fill card number
    await this.cardNumberInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.cardNumberInput.fill(cardNumber);
    await this.page.waitForTimeout(500);

    // Select expiry month - use selectOption for HTML select elements
    await this.expiryMonthDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.expiryMonthDropdown.selectOption(expiryMonth);
    await this.page.waitForTimeout(500);

    // Select expiry year - use selectOption for HTML select elements
    await this.expiryYearDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.expiryYearDropdown.selectOption(expiryYear);
    await this.page.waitForTimeout(500);
  }

  async submitCardDetails() {
    // Wait for the submit button to be enabled and visible
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Wait a moment to ensure form is ready
    await this.page.waitForTimeout(1000);
    
    // Click submit and wait for card to be added
    await this.submitButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstPaymentMethod() {
    // Wait for payment cards to be visible
    await this.page.waitForTimeout(1000);
    
    // Select the first payment card radio button
    await this.firstPaymentRadio.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstPaymentRadio.click();
    await this.page.waitForTimeout(500);
  }

  async proceedToContinue() {
    await this.continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async completePurchase() {
    await this.placeOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.placeOrderButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async submitOrder() {
    await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

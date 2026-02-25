import { Page, Locator } from '@playwright/test';

export class AddressPage {
  readonly page: Page;
  readonly addNewAddressButton: Locator;
  readonly countryInput: Locator;
  readonly nameInput: Locator;
  readonly mobileInput: Locator;
  readonly zipcodeInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewAddressButton = page.getByText('Add New Address', { exact: true });
    this.countryInput = page.getByRole('textbox', { name: 'Country' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.mobileInput = page.getByLabel('Mobile Number');
    this.zipcodeInput = page.getByRole('textbox', { name: 'ZIP Code' });
    this.addressInput = page.getByRole('textbox', { name: 'Address' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.stateInput = page.getByRole('textbox', { name: 'State' });
    this.submitButton = page.getByText('Submit');
  }

  async clickAddNewAddress() {
    await this.addNewAddressButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addNewAddressButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillAddressForm(
    country: string,
    name: string,
    mobile: string,
    zipcode: string,
    address: string,
    city: string,
    state: string
  ) {
    // Fill country
    await this.countryInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.countryInput.fill(country);

    // Fill name
    await this.nameInput.fill(name);

    // Fill mobile number
    await this.mobileInput.fill(mobile);

    // Fill zipcode
    await this.zipcodeInput.fill(zipcode);

    // Fill address
    await this.addressInput.fill(address);

    // Fill city
    await this.cityInput.fill(city);

    // Fill state
    await this.stateInput.fill(state);

    // Wait a moment before submitting
    await this.page.waitForTimeout(500);

    // Click submit
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

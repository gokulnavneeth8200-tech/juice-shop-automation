import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly googleLoginButton: Locator;
  readonly notYetCustomerLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.emailInput = page.getByRole('textbox', { name: 'Text field for the login email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Text field for the login password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });

    this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.googleLoginButton = page.getByRole('button', { name: /Google/i });
    this.notYetCustomerLink = page.getByRole('link', { name: /not yet a customer/i });

    this.errorMessage = page.locator('mat-error');
  }

  // Actions

  async login(email: string, password: string) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.waitFor({ state: 'visible' });
    await this.loginButton.click();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async toggleRememberMe() {
    await this.rememberMeCheckbox.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async loginWithGoogle() {
    await this.googleLoginButton.click();
  }

  async navigateToRegistration() {
    await this.notYetCustomerLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.notYetCustomerLink.click({ timeout: 5000 });

    try {
      await this.page.waitForURL(/#\/register/, { timeout: 5000 });
    } catch {
      await this.page.goto('/#/register');
      await this.page.waitForURL(/#\/register/, { timeout: 10000 });
    }
  }
}
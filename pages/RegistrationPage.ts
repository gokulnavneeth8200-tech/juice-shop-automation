import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly securityQuestionDropdown: Locator;
  readonly securityAnswerInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Use ID-based selectors for registration fields which are more reliable
    this.emailInput = page.locator('#emailControl');
    this.passwordInput = page.locator('#passwordControl');
    this.securityQuestionDropdown = page.getByRole('combobox', { name: 'Selection list for the security question' });
    this.securityAnswerInput = page.locator('#securityAnswerControl');
    this.registerButton = page.locator('button[type="submit"]');
  }

  async registerUser(email: string, password: string, answer: string) {
    // Wait for email field to be visible and fill it
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
    
    // Fill password field
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
    
    // Fill repeat password field
    await this.page.locator('#repeatPasswordControl').waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator('#repeatPasswordControl').fill(password);
    
    // Wait a moment for the form to be interactive
    await this.page.waitForTimeout(1000);
    
    // Click on security question dropdown to open it
    await this.securityQuestionDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await this.securityQuestionDropdown.click();
    
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    
    // Try different selectors for the security question
    try {
      await this.page.getByText('Mother\'s maiden name?').click();
    } catch {
      try {
        // Try alternative text matching
        await this.page.locator('mat-option').filter({ hasText: /mother/i }).first().click();
      } catch {
        // Try clicking the first option in the dropdown
        await this.page.locator('mat-option').first().click();
      }
    }
    
    // Fill security answer
    await this.securityAnswerInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.securityAnswerInput.fill(answer);
    
    // Wait a moment before clicking register
    await this.page.waitForTimeout(500);
    
    // Click register button
    await this.registerButton.click();
    
    // Wait for navigation after registration
    await this.page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  }
}

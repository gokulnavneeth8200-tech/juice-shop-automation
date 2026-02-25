import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/Loginpage';
import user from '../../test-data/new-user.json';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await page.goto('http://localhost:3000');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Close cookie consent dialog
  await page.getByRole('button', { name: 'dismiss cookie message' }).click();
  
  // Close welcome banner
  await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
  
  await homePage.navigateToLogin();
  await loginPage.login(user.email, user.password);
});

test('User should be logged in successfully', async ({ page }) => {
  // Verify user is on the home page after login
  await expect(page).toHaveURL(/.*\/#/);
});
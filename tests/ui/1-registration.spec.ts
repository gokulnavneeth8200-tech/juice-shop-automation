import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/Loginpage';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { saveUserCredentials } from '../../utils/testDataHelper';

test.describe.configure({ mode: 'serial' });

test('Create new user and store credentials', async ({ page }) => {
  test.setTimeout(60000);

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page); 

  const newUser = {
    email: `gokul${Date.now()}@juiceshop.com`,
    password: 'Qwerty@123'
  };

  await page.goto('http://localhost:3000');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('networkidle');
  
  // Close cookie consent dialog
  await page.getByRole('button', { name: 'dismiss cookie message' }).click();
  
  // Close welcome banner
  await page.getByRole('button', { name: 'Close Welcome Banner' }).click();

  await homePage.navigateToLogin();
  await loginPage.navigateToRegistration();

  await registrationPage.registerUser(
    newUser.email,
    newUser.password,
    'MyAnswer'
  );

  // ✅ Save credentials
  saveUserCredentials(newUser);
});
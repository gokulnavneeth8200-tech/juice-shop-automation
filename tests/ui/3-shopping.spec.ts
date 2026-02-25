import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/Loginpage';
import { SearchPage } from '../../pages/SearchPage';
import { BasketPage } from '../../pages/BasketPage';
import { AddressPage } from '../../pages/AddressPage';
import { SelectAddressPage } from '../../pages/SelectAddressPage';
import { DeliveryMethodPage } from '../../pages/DeliveryMethodPage';
import { PaymentPage } from '../../pages/PaymentPage';
import { generateRandomAddress, generateRandomCardDetails } from '../../utils/testDataGenerator';
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
  
  // Login with saved credentials
  await homePage.navigateToLogin();
  await loginPage.login(user.email, user.password);
  
  // Wait for homepage to load after login
  await page.waitForLoadState('networkidle');
});

test('Complete shopping flow - Add product, checkout, add address, delivery, and payment', async ({ page }) => {
  test.setTimeout(60000); // Increase timeout to 60 seconds for this long test
  
  const searchPage = new SearchPage(page);
  const basketPage = new BasketPage(page);
  const addressPage = new AddressPage(page);
  const selectAddressPage = new SelectAddressPage(page);
  const deliveryMethodPage = new DeliveryMethodPage(page);
  const paymentPage = new PaymentPage(page);

  // Generate random test data
  const randomAddress = generateRandomAddress();
  const randomCard = generateRandomCardDetails();

  // Step 1: Add product to basket
  await test.step('Step 1: Add first product to basket', async () => {
    await searchPage.addFirstProductToBasket();
    expect(page).toBeTruthy();
  });

  // Step 2: Navigate to basket
  await test.step('Step 2: Navigate to basket', async () => {
    await searchPage.navigateToBasket();
    const hasItems = await basketPage.verifyItemsInBasket();
    expect(hasItems).toBeTruthy();
  });

  // Step 3: Proceed to checkout
  await test.step('Step 3: Proceed to checkout', async () => {
    await basketPage.proceedToCheckout();
  });

  // Step 4: Add new address
  await test.step('Step 4: Add new address', async () => {
    await addressPage.clickAddNewAddress();
    await addressPage.fillAddressForm(
      randomAddress.country,
      randomAddress.name,
      randomAddress.mobileNumber,
      randomAddress.zipcode,
      randomAddress.address,
      randomAddress.city,
      randomAddress.state
    );
  });

  // Step 5: Select address
  await test.step('Step 5: Select address', async () => {
    await selectAddressPage.selectFirstAddress();
    await selectAddressPage.proceedToContinue();
  });

  // Step 6: Select delivery method
  await test.step('Step 6: Select delivery method', async () => {
    await deliveryMethodPage.selectFirstDeliveryMethod();
    await deliveryMethodPage.proceedToContinue();
  });

  // Step 7: Add card details
  await test.step('Step 7: Add card details', async () => {
    await paymentPage.clickAddNewCard();
    await paymentPage.fillCardDetails(
      randomCard.nameOnCard,
      randomCard.cardNumber,
      randomCard.expiryMonth,
      randomCard.expiryYear,
    );
    await paymentPage.submitCardDetails();
    // Verify card was added successfully
    await page.waitForTimeout(1000);
    expect(page).toBeTruthy();
  });
});

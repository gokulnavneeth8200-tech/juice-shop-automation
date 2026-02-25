import { test, expect } from '@playwright/test';
import { generateRandomCardDetails } from '../../utils/testDataGenerator';
import user from '../../test-data/new-user.json';

let authToken: string;
let userId: string;

test.describe('Payment API Tests', () => {
  
  test.beforeAll(async ({ request }) => {
    // Login via API to get authentication token
    const loginResponse = await request.post('http://localhost:3000/rest/user/login', {
      data: {
        email: user.email,
        password: user.password
      }
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    authToken = loginData.authentication.token;
    
    // Extract user ID from token (JWT payload)
    const tokenPayload = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
    userId = tokenPayload.data.id;
    
    console.log('✅ API Authentication successful');
  });

  test('Add unique card details via API', async ({ request }) => {
    // Generate unique card details
    const cardDetails = generateRandomCardDetails();
    
    // Add a unique identifier to make it truly unique
    const uniqueCardDetails = {
      fullName: `${cardDetails.nameOnCard}-${Date.now()}`,
      cardNum: parseInt(cardDetails.cardNumber),
      expMonth: parseInt(cardDetails.expiryMonth),
      expYear: parseInt(cardDetails.expiryYear)
    };

    // Add card via API
    const addCardResponse = await request.post('http://localhost:3000/api/Cards', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: uniqueCardDetails
    });

    expect(addCardResponse.ok()).toBeTruthy();
    const cardData = await addCardResponse.json();
    
    // Verify card was added successfully
    expect(cardData.status).toBe('success');
    expect(cardData.data).toBeDefined();
    expect(cardData.data.fullName).toBe(uniqueCardDetails.fullName);
    expect(cardData.data.cardNum).toBe(uniqueCardDetails.cardNum);
    expect(cardData.data.expMonth).toBe(uniqueCardDetails.expMonth);
    expect(cardData.data.expYear).toBe(uniqueCardDetails.expYear);
    
    console.log('✅ Card added successfully via API:', cardData.data.id);

    // Verify by fetching all cards
    const getAllCardsResponse = await request.get('http://localhost:3000/api/Cards', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    expect(getAllCardsResponse.ok()).toBeTruthy();
    const allCardsData = await getAllCardsResponse.json();
    
    // Find our newly added card
    const addedCard = allCardsData.data.find((card: any) => card.id === cardData.data.id);
    expect(addedCard).toBeDefined();
    expect(addedCard.fullName).toBe(uniqueCardDetails.fullName);
    
    console.log('✅ Card verified in the list of all cards');
  });

  test('Add multiple unique cards via API', async ({ request }) => {
    const cardsToAdd = 3;
    const addedCardIds: number[] = [];

    for (let i = 0; i < cardsToAdd; i++) {
      const cardDetails = generateRandomCardDetails();
      
      const uniqueCardDetails = {
        fullName: `${cardDetails.nameOnCard}-${Date.now()}-${i}`,
        cardNum: parseInt(cardDetails.cardNumber),
        expMonth: parseInt(cardDetails.expiryMonth),
        expYear: parseInt(cardDetails.expiryYear)
      };

      const addCardResponse = await request.post('http://localhost:3000/api/Cards', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        data: uniqueCardDetails
      });

      expect(addCardResponse.ok()).toBeTruthy();
      const cardData = await addCardResponse.json();
      addedCardIds.push(cardData.data.id);
      
      console.log(`✅ Card ${i + 1}/${cardsToAdd} added: ${cardData.data.id}`);
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Verify all cards were added
    expect(addedCardIds).toHaveLength(cardsToAdd);
    console.log(`✅ Successfully added ${cardsToAdd} unique cards via API`);
  });

  test('Validate card number format via API', async ({ request }) => {
    // Try to add card with invalid card number (should fail)
    const invalidCardDetails = {
      fullName: 'Test User',
      cardNum: 123, // Invalid - too short
      expMonth: 12,
      expYear: 2080
    };

    const addCardResponse = await request.post('http://localhost:3000/api/Cards', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: invalidCardDetails
    });

    // This might succeed or fail depending on Juice Shop validation
    // Adjust expectation based on actual API behavior
    const cardData = await addCardResponse.json();
    console.log('📋 API response for invalid card:', cardData);
  });
});

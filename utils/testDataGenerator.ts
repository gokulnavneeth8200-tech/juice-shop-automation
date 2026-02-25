export function generateRandomAddress() {
  const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
  const streets = ['Main', 'Oak', 'Elm', 'Maple', 'Pine', 'Cedar', 'Birch', 'Walnut'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Dallas', 'Miami', 'Boston'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'TX', 'FL', 'MA'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];

  const randomIndex = (arr: string[]) => Math.floor(Math.random() * arr.length);

  const firstName = firstNames[randomIndex(firstNames)];
  const lastName = lastNames[randomIndex(lastNames)];
  const streetNumber = Math.floor(Math.random() * 999) + 1;
  const streetName = streets[randomIndex(streets)];
  const city = cities[randomIndex(cities)];
  const state = states[randomIndex(states)];
  const country = countries[randomIndex(countries)];
  const zipcode = String(Math.floor(Math.random() * 90000) + 10000);
  const mobileNumber = String(Math.floor(Math.random() * 9000000000) + 1000000000);

  return {
    name: `${firstName} ${lastName}`,
    address: `${streetNumber} ${streetName} Street`,
    city: city,
    state: state,
    country: country,
    zipcode: zipcode,
    mobileNumber: mobileNumber
  };
}

export function generateRandomCardDetails() {
  const cardholders = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Williams', 'David Brown'];
  const randomIndex = (arr: string[]) => Math.floor(Math.random() * arr.length);

  return {
    nameOnCard: cardholders[randomIndex(cardholders)],
    cardNumber: '4111111111111111', // Valid test card number
    expiryMonth: '12',
    expiryYear: '2080', // Updated to match available years in Juice Shop (2080-2099)
    cvv: String(Math.floor(Math.random() * 900) + 100)
  };
}

const { faker } = require('@faker-js/faker');

// Test the Faker functions
try {
  const username = faker.internet.userName();
  const randomNumber = faker.number.int({ min: 0, max: 10 }); // Updated line
  const gender = faker.helpers.arrayElement(['male', 'female']);

  console.log('Username:', username);
  console.log('Random Number:', randomNumber);
  console.log('Gender:', gender);
} catch (error) {
  console.error('Error during Faker test:', error);
}
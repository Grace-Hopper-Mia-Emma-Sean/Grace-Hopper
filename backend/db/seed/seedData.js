const client = require("../client");

const {
  //TO DO: call db components as they get created
} = require("../index");

const dropTables = async () => {
  try {
    console.log("Dropping All Tables...");

    await client.query(`
    DROP TABLE IF EXISTS payment_details;
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS order_details;
    DROP TABLE IF EXISTS product_discount;
    DROP TABLE IF EXISTS product_inventory;
    DROP TABLE IF EXISTS product_category;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS user_payment;
    DROP TABLE IF EXISTS user_address;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS shopping_session;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping table!");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      telephone INTEGER NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );

    CREATE TABLE shopping_session (
      id SERIAL PRIMARY KEY, 
      "user_id" INTEGER REFERENCES users(id),
      total INTEGER NOT NULL
    );

    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY, 
      "session_id" INTEGER REFERENCES shopping_session(id),
      "product_id" INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );

    CREATE TABLE user_address (
      id SERIAL PRIMARY KEY, 
      "user_id" INTEGER REFERENCES users(id),
      address_line1 VARCHAR(255) NOT NULL,
      address_line2 VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL, 
      postal_code INTEGER NOT NULL,
      country VARCHAR(255) NOT NULL,
      telephone INTEGER NOT NULL,
      mobile INTEGER NOT NULL
    );

    CREATE TABLE user_payment (
      id SERIAL PRIMARY KEY, 
      "user_id" INTEGER REFERENCES users(id),
      payment_type VARCHAR(255) NOT NULL,
      provider VARCHAR(255) NOT NULL,
      account_no INTEGER NOT NULL,
      expiry INTEGER NOT NULL
    );

    CREAT TABLE products (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      desc VARCHAR(255) NOT NULL,
      SKU INTEGER NOT NULL,
      "category_id" INTEGER REFERENCES product_category(id),
      "inventory_id" INTEGER REFERENCES product_category(id),
      price INTEGER NOT NULL,
      "discount_id" INTEGER REFERENCES product_discount(id)
    );


    CREATE TABLE product_category (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      desc VARCHAR(255) NOT NULL
    );

    CREATE TABLE product_inventory (
      id SERIAL PRIMARY KEY, 
      quantity INTEGER NOT NULL
    );

    CREATE TABLE product_discount (
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL,
      desc VARCHAR(255) NOT NULL,
      discount_percent INTEGER NOT NULL,
      active BOOLEAN DEFAULT false
    );

    CREATE TABLE order_details (
      id SERIAL PRIMARY KEY, 
      "user_id" INTEGER REFERENCES users(id),
      total INTEGER NOT NULL,
      "payment_id" INTEGER REFERENCES user_payment(id)
    );

    CREATE TABLE order_items (
      id SERIAL PRIMARY KEY, 
      "order_id" INTEGER REFERENCES order_details(id),
      "product_id" INTEGER REFERENCES products(id)
      quantity INTEGER NOT NULL
    );

    CREATE TABLE payment_details (
      id SERIAL PRIMARY KEY, 
      "order_id" INTEGER REFERENCES order_details(id),
      amount INTEGER NOT NULL,
      provider VARCHAR(255) NOT NULL,
      status BOOLEAN DEFAULT false
    );

    `);
  } catch (error) {
    console.error("Error dropping table!");
    throw error;
  }
};

const createInitialUsers = () => {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      // ! When you suck at creating fake user names, so you just pick some names you used in the past in an MMO...
      {
        username: "haru.aoi",
        password: "august2016",
        first_name: "Haru",
        last_name: "Aoi",
        phone: 1234567890,
        isAdmin: false,
      },
      {
        username: "haru.estarriol",
        password: "september2016",
        first_name: "Haru",
        last_name: "Estarriol",
        phone: 2345678901,
        isAdmin: false,
      },
      {
        username: "erin.loirratse",
        password: "april2018",
        first_name: "Erin",
        last_name: "Loirratse",
        phone: 3456789012,
        isAdmin: false,
      },
      {
        username: "ember.elise",
        password: "november2018",
        first_name: "Ember",
        last_name: "Elise",
        phone: 4567890123,
        isAdmin: false,
      },
      {
        username: "eisha.elise",
        password: "january2019",
        first_name: "Eisha",
        last_name: "Elise",
        phone: 5678901234,
        isAdmin: false,
      },
      {
        username: "emma.loirratse",
        password: "april2020",
        first_name: "Emma",
        last_name: "Loirratse",
        phone: 6789012345,
        isAdmin: false,
      },
      {
        username: "nia.akemi",
        password: "july2021",
        first_name: "Nia",
        last_name: "Akemi",
        phone: 8901234567,
        isAdmin: false,
      },
      {
        username: "miku.akemi",
        password: "september2021",
        first_name: "Miku",
        last_name: "Akemi",
        phone: 9012345678,
        isAdmin: false,
      },
      {
        username: "emmaelise",
        password: "password",
        first_name: "Emma",
        last_name: "Elise",
        phone: 9876543210,
        isAdmin: true,
      },
      {
        username: "miadao",
        password: "password",
        first_name: "Mia",
        last_name: "Dao",
        phone: 8765432109,
        isAdmin: true,
      },
      {
        username: "seanconte",
        password: "password",
        first_name: "Sean",
        last_name: "Conte",
        phone: 7654321098,
        isAdmin: true,
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
};

const createInitialShoppingSession = () => {
  console.log("Starting to create shopping sessions...");
  try {
    const shoppingSessionsToCreate = [
      { user_id: 4, total: 42.21 },
      { user_id: 2, total: 123.54 },
      { user_id: 4, total: 80.74 },
      { user_id: 3, total: 3.64 },
      { user_id: 6, total: 45.34 },
      { user_id: 4, total: 92.33 },
      { user_id: 5, total: 50.33 },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating shopping sessions!");
    throw error;
  }
};

const createInitialCartItems = () => {
  console.log("Starting to create cart items...");
  try {
    const cartItemsToCreate = [
      { session_id: 3, product_id: 23, quantity: 2 },
      { session_id: 4, product_id: 43, quantity: 1 },
      { session_id: 5, product_id: 52, quantity: 3 },
      { session_id: 2, product_id: 9, quantity: 2 },
      { session_id: 10, product_id: 17, quantity: 2 },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating cart items!");
    throw error;
  }
};

const createInitialUserAddresses = () => {
  console.log("Starting to create user addresses...");
  try {
    const userAddressesToCreate = [
      {
        user_id: 1,
        address_line1: "10 Main St",
        address_line2: "",
        city: "Portland",
        state: "OR",
        postal_code: 12345,
        country: "United States",
        telephone: 1234567890,
        mobile: 1234567890,
      },
      {
        user_id: 2,
        address_line1: "20 First Ave",
        address_line2: "",
        city: "San Diego",
        state: "CA",
        postal_code: 23456,
        country: "United States",
        telephone: 2345678901,
        mobile: 2345678901,
      },
      {
        user_id: 3,
        address_line1: "30 Second Blvd",
        address_line2: "",
        city: "New York City",
        state: "NY",
        postal_code: 34567,
        country: "United States",
        telephone: 3456789012,
        mobile: 3456789012,
      },
      {
        user_id: 4,
        address_line1: "40 Random Rd",
        address_line2: "",
        city: "San Francisco",
        state: "CA",
        postal_code: 45678,
        country: "United States",
        telephone: 4567890123,
        mobile: 4567890123,
      },
      {
        user_id: 5,
        address_line1: "50 Sassy St",
        address_line2: "",
        city: "Sacramento",
        state: "CA",
        postal_code: 56789,
        country: "United States",
        telephone: 5678901234,
        mobile: 5678901234,
      },
      {
        user_id: 6,
        address_line1: "60 Annoyed Ave",
        address_line2: "",
        city: "Boston",
        state: "MA",
        postal_code: 67890,
        country: "United States",
        telephone: 6789012345,
        mobile: 6789012345,
      },
      {
        user_id: 7,
        address_line1: "70 Bored Blvd",
        address_line2: "",
        city: "Portland",
        state: "ME",
        postal_code: 78901,
        country: "United States",
        telephone: 8901234567,
        mobile: 8901234567,
      },
      {
        user_id: 8,
        address_line1: "80 Ridiculous Rd",
        address_line2: "",
        city: "Richmond",
        state: "VA",
        postal_code: 89012,
        country: "United States",
        telephone: 9012345678,
        mobile: 9012345678,
      },
      {
        user_id: 9,
        address_line1: "90 Satirical St",
        address_line2: "",
        city: "Los Alamos",
        state: "NM",
        postal_code: 90123,
        country: "United States",
        telephone: 9876543210,
        mobile: 9876543210,
      },
      {
        user_id: 10,
        address_line1: "100 Abstract Ave",
        address_line2: "",
        city: "Seattle",
        state: "WA",
        postal_code: 98765,
        country: "United States",
        telephone: 8765432109,
        mobile: 8765432109,
      },
      {
        user_id: 11,
        address_line1: "110 Booty Blvd",
        address_line2: "",
        city: "Tacoma",
        state: "WA",
        postal_code: 87654,
        country: "United States",
        telephone: 7654321098,
        mobile: 7654321098,
      },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating user addresses!");
    throw error;
  }
};

const createUserPayment = () => {
  console.log("Starting to create user payment...");
  try {
    const userPaymentsToCreate = [
      {
        user_id: 1,
        payment_type: "credit",
        provider: "VISA",
        account_no: 1234567890123456,
        expiry: 0122,
      },
      {
        user_id: 2,
        payment_type: "credit",
        provider: "MasterCard",
        account_no: 2345678901234567,
        expiry: 0222,
      },
      {
        user_id: 3,
        payment_type: "credit",
        provider: "VISA",
        account_no: 3456789012345678,
        expiry: 0322,
      },
      {
        user_id: 4,
        payment_type: "debit",
        provider: "VISA",
        account_no: 4567890123456789,
        expiry: 0422,
      },
      {
        user_id: 5,
        payment_type: "debit",
        provider: "VISA",
        account_no: 5678901234567890,
        expiry: 0523,
      },
      {
        user_id: 6,
        payment_type: "credit",
        provider: "VISA",
        account_no: 6789012345678901,
        expiry: 0623,
      },
      {
        user_id: 7,
        payment_type: "debit",
        provider: "VISA",
        account_no: 7890123456789012,
        expiry: 0723,
      },
      {
        user_id: 8,
        payment_type: "debit",
        provider: "MasterCard",
        account_no: 8901234567890123,
        expiry: 0823,
      },
      {
        user_id: 9,
        payment_type: "credit",
        provider: "VISA",
        account_no: 9012345678901234,
        expiry: 0924,
      },
      {
        user_id: 10,
        payment_type: "debit",
        provider: "VISA",
        account_no: 9876543210987654,
        expiry: 1024,
      },
      {
        user_id: 11,
        payment_type: "credit",
        provider: "VISA",
        account_no: 8765432109876543,
        expiry: 1124,
      },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating user payment!");
    throw error;
  }
};

//SAMPLE BELOW:
// const createInitialProducts = async () => {
//   try {
//     console.log('Starting to create products...');

//     const productsToCreate = [
//       //TO DO
//     ]
//     const activities = await Promise.all(productsToCreate.map(createProducts));
z;
//     console.log('Products created:');
//     console.log(products);

//     console.log('Finished creating products!');
//   } catch (error) {
//     console.error('Error creating products!');
//     throw error;
//   }
// }

//SAMPLE BELOW
// const createInitialUsers = async () => {
//   try {
//     console.log('starting to create users...');

//     const usersToCreate = [
//       //TO DO
//     ]
//     const routines = await Promise.all(usersToCreate.map(routine => createUser(users)));
//     console.log('Users Created: ', users)
//     console.log('Finished creating users.')
//   } catch (error) {
//     throw error;
//   }
// }

// ADD MORE CREATION FOR ALL TABLES

//SAMPLE rebuildDB() below:
// const rebuildDB = async () => {
//   try {
//     client.connect();
//     await functions from above
//     await
//     await
//     await
//     await
//     await

//   } catch (error) {
//     console.log('Error during rebuildDB')
//     throw error;
//   }
// finally {
//   client.end()
// }
// }

module.exports = {
  rebuildDB,
};

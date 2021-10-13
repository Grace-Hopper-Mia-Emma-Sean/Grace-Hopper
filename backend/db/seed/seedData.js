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
      "order_id"
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
      { username: "haru.aoi", password: "august2016" },
      { username: "haru.estarriol", password: "september2016" },
      { username: "erin.loirratse", password: "april2018" },
      { username: "ember.elise", password: "november2018" },
      { username: "eisha.elise", password: "january2019" },
      { username: "emma.loirratse", password: "april2020" },
      { username: "emma.elise", password: "june2020" },
      { username: "nia.akemi", password: "july2021" },
      { username: "miku.akemi", password: "september2021" },
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
//SAMPLE BELOW:
// const createInitialProducts = async () => {
//   try {
//     console.log('Starting to create products...');

//     const productsToCreate = [
//       //TO DO
//     ]
//     const activities = await Promise.all(productsToCreate.map(createProducts));

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

const { client } = require("../client");

// users seed
const {
  createInitialUsers,
  createInitialUserAddresses,
  createInitialShoppingSession,
  createInitialCartItems,
} = require("./users");

// products seed
const {
  createInitialProducts,
  createInitialProductCategories,
  createInitialProductInventory,
  createInitialProductDiscounts,
} = require("./products");

// orders seed
const {
  createInitialOrderDetails,
  createInitialOrderItems,
} = require("./orders");

// payment seed
const {
  createInitialUserPayment,
  createInitialPaymentDetails,
} = require("./payments");

const dropTables = async () => {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS payment_details;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS product_discount;
      DROP TABLE IF EXISTS product_inventory;
      DROP TABLE IF EXISTS product_category;
      DROP TABLE IF EXISTS shopping_session;
      DROP TABLE IF EXISTS user_payment;
      DROP TABLE IF EXISTS user_address;
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
    try {
      console.log("creating users");
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY, 
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          telephone VARCHAR(15) NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
        );
      `);
      try {
        console.log("creating user_address");
        await client.query(`
              CREATE TABLE user_address (
                id SERIAL PRIMARY KEY, 
                user_id INTEGER REFERENCES users(id),
                address_line1 VARCHAR(255) NOT NULL,
                address_line2 VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL, 
                postal_code INTEGER NOT NULL,
                country VARCHAR(255) NOT NULL,
                telephone VARCHAR(15) NOT NULL,
                mobile VARCHAR(15) NOT NULL
              );
            `);
        try {
          console.log("creating shopping_session");
          await client.query(`
              CREATE TABLE shopping_session (
                id SERIAL PRIMARY KEY, 
                user_id INTEGER REFERENCES users(id),
                total DECIMAL(19,4) NOT NULL
              ); 
            `);
          try {
            console.log("creating user_payment");
            await client.query(`
              CREATE TABLE user_payment (
              id SERIAL PRIMARY KEY, 
              "user_id" INTEGER REFERENCES users(id),
              payment_type VARCHAR(255) NOT NULL,
              provider VARCHAR(255) NOT NULL,
              account_no VARCHAR(16) NOT NULL,
              expiry MONTH-YEAR NOT NULL
            );
          `);
            try {
              console.log("creating product_category");
              await client.query(`
                CREATE TABLE product_category (
                  id SERIAL PRIMARY KEY, 
                  name VARCHAR(255) NOT NULL,
                  description VARCHAR(255) NOT NULL
                );
              `);
              try {
                console.log("creating product_inventory");
                await client.query(`
                  CREATE TABLE product_inventory (
                    id SERIAL PRIMARY KEY, 
                    quantity INTEGER NOT NULL
                  );
                `);
                try {
                  console.log("creating product_discount");
                  await client.query(`
                    CREATE TABLE product_discount (
                      id SERIAL PRIMARY KEY, 
                      name VARCHAR(255) NOT NULL,
                      description VARCHAR(255) NOT NULL,
                      discount_percent INTEGER NOT NULL,
                      active BOOLEAN DEFAULT false
                    );
                  `);
                  try {
                    console.log("creating order_details");
                    await client.query(`
                      CREATE TABLE order_details (
                        id SERIAL PRIMARY KEY,
                        "user_id" INTEGER REFERENCES users(id),
                        total DECIMAL(19,4) NOT NULL,
                        "payment_id" INTEGER REFERENCES payment_details(id)
                        );
                    `);
                    try {
                      console.log("creating products");
                      await client.query(`
                         CREATE TABLE products (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            description VARCHAR(255) NOT NULL,
                            SKU INTEGER NOT NULL,
                            category_id INTEGER REFERENCES product_category(id),
                            inventory_id INTEGER REFERENCES product_category(id),
                            price INTEGER NOT NULL,
                            discount_id INTEGER REFERENCES product_discount(id)
                          );
                      `);

                      try {
                        console.log("creating payment_details");
                        await client.query(`
                          CREATE TABLE payment_details (
                            id SERIAL PRIMARY KEY, 
                            "order_id" INTEGER REFERENCES order_details(id),
                            amount DECIMAL(19,4) NOT NULL,
                            provider VARCHAR(255) NOT NULL,
                            status BOOLEAN DEFAULT false
                          );
                        `);
                        try {
                          console.log("creating cart_items");
                          await client.query(`
                            CREATE TABLE cart_items (
                              id SERIAL PRIMARY KEY,
                              session_id INTEGER REFERENCES shopping_session(id),
                              product_id INTEGER REFERENCES products(id),
                              quantity INTEGER NOT NULL
                            );
                          `);
                          try {
                            console.log("creating order_items");
                            await client.query(`
                              CREATE TABLE order_items (
                                id SERIAL PRIMARY KEY, 
                                "order_id" INTEGER REFERENCES order_details(id),
                                "product_id" INTEGER REFERENCES products(id),
                                quantity INTEGER NOT NULL
                             );
                           `);
                          } catch (error) {
                            console.error("error creating order_items table");
                          }
                        } catch (error) {
                          console.error("error creating cart_items table");
                        }
                      } catch (error) {
                        console.error("error creating payment_details table");
                      }
                    } catch (error) {
                      console.error("error creating products table");
                    }
                  } catch (error) {
                    console.error("error creating order_details table");
                  }
                } catch (error) {
                  console.error("error creating product_discount table");
                }
              } catch (error) {
                console.error("error creating product_inventory table");
              }
            } catch (error) {
              console.error("error creating product_category table");
            }
          } catch (error) {
            console.error("error creating user_payment table");
          }
        } catch (error) {
          console.error("error creating shopping_session table");
        }
      } catch (error) {
        console.error("error creating user_address table");
      }
    } catch (error) {
      console.error("error creating users table");
    }
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
};

/**
 *
 * * Done: users table works
 * * Done: user_address table works
 * * Done: shopping_session table works
 *
 * TODO: user_payment => requires users table
 * TODO: product_category
 * TODO: product_inventory
 * TODO: product_discount
 * TODO: order_details => requires users table && user_payment table
 * TODO: products => requires product_category table && product_discount table
 * TODO: payment_details => requires products table
 * TODO: cart_items => requires shopping_session table && products table
 * TODO: order_items => requires order_details table && products table
 *
 */

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialUserAddresses();
    await createInitialShoppingSession();
    // await createInitialUserPayment();
    // await createInitialCartItems();

    // await createInitialProducts();
    // await createInitialProductCategories();
    // await createInitialProductInventory();
    // await createInitialProductDiscounts();

    // await createInitialOrderDetails();
    // await createInitialOrderItems();
    // await createInitialPaymentDetails();
   
  } catch (error) {
    console.error("Error during rebuildDB... sad face");
    throw error;
  }
};

module.exports = { rebuildDB };

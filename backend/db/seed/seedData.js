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

const {
  updateProduct,
  getProductById,
  deleteProduct,
  createProduct,
  getAllProducts,
  updateAllProductDiscounts,
} = require("../adapters/products");

const {
  getAllProductDiscounts,
  deleteProductDiscount,
} = require("../adapters/product_discount");

const {
  deleteProductCategory,
  getAllProductCategories,
} = require("../adapters/product_category");

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
      DROP TABLE IF EXISTS order_details;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS payment_details;
      DROP TABLE IF EXISTS product_discount;
      DROP TABLE IF EXISTS product_inventory;
      DROP TABLE IF EXISTS product_category;
      DROP TABLE IF EXISTS user_payment;
      DROP TABLE IF EXISTS shopping_session;
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
      // Removed null reqs for users => if a guest makes a purchase, they'll be added to the user table to ensure we have a user id for other tables to reference
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY, 
          username VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          telephone VARCHAR(15),
          email VARCHAR(255),
          "isAdmin" BOOLEAN DEFAULT false
        );
      `);
      try {
        console.log("creating user_address");
        // Keeping null reqs for addresses => if we don't use Stripe, we'd need to get that info anyways for shipping and payments, etc.
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
          // shopping_session is being archived, but it's staying as part of the seed to avoid complications downstream; will entirely remove time permitting after MVP met
          await client.query(`
              CREATE TABLE shopping_session (
                id SERIAL PRIMARY KEY, 
                user_id INTEGER REFERENCES users(id),
                total DECIMAL(19,2)
              ); 
            `);
          try {
            console.log("creating user_payment");
            await client.query(`
              CREATE TABLE user_payment (
              id SERIAL PRIMARY KEY, 
              user_id INTEGER REFERENCES users(id),
              payment_type VARCHAR(255),
              provider VARCHAR(255),
              account_no VARCHAR(16),
              expiry DATE
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
                    console.log("creating payment_details");
                    await client.query(`
                          CREATE TABLE payment_details (
                            id SERIAL PRIMARY KEY, 
                            order_id INTEGER CHECK (order_id>0),
                            amount DECIMAL(19,2) CHECK (amount>0),
                            provider VARCHAR(255),
                            status BOOLEAN DEFAULT false
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
                            price DECIMAL(19,2) NOT NULL,
                            discount_id INTEGER REFERENCES product_discount(id),
                            quantity INTEGER NOT NULL
                          );
                      `);
                      try {
                        console.log("creating order_details");
                        await client.query(`
                          CREATE TABLE order_details (
                            id SERIAL PRIMARY KEY,
                            user_id INTEGER CHECK (user_id>0),
                            total DECIMAL(19,2) CHECK (total>0),
                            payment_id INTEGER CHECK (payment_id>0)
                            );
                        `);
                        // "user_id" INTEGER REFERENCES users(id) - EDITTED
                        // "payment_id" INTEGER REFERENCES payment_details(id) - EDITTED


                        try {
                          console.log("creating cart_items");
                          // cart_items is being archived, but it's staying as part of the seed to avoid complications downstream; will entirely remove time permitting after MVP met
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
                                quantity INTEGER CHECK (quantity>0)
                             );
                           `);
                          } catch (error) {
                            console.error("error creating order_items table");
                          }
                        } catch (error) {
                          console.error("error creating cart_items table");
                        }
                      } catch (error) {
                        console.error("error creating order_details table");
                      }
                    } catch (error) {
                      console.error("error creating products table");
                    }
                  } catch (error) {
                    console.error("error creating payment_details table");
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

const rebuildDB = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialUserAddresses();
    await createInitialShoppingSession();
    await createInitialUserPayment();
    await createInitialProductCategories();
    await createInitialProductInventory();
    await createInitialProductDiscounts();
    await createInitialPaymentDetails();
    await createInitialProducts();
    await createInitialOrderDetails();
    await createInitialCartItems();
    await createInitialOrderItems();
  } catch (error) {
    console.error("Error during rebuildDB... sad face");
    throw error;
  }
};

const testDB = async () => {
  try {
    console.log("Calling updateProduct on id 1");
    const updatedProduct = await updateProduct(1, {
      name: "The Apple M1 Chip (Recently Updated!)",
      description: "Fast, reliable, and cutting-edge",
      sku: "11111111",
      category_id: "2",
      price: "749.99",
      discount_id: "2",
      quantity: "30",
    });
    console.log("Result:", updatedProduct);

    console.log("Calling createProduct");
    const newProduct = await createProduct({
      name: "Apple M2 Chip",
      description: "The thinking man's processor",
      SKU: "12121212",
      category_id: "1",
      price: "700",
      discount_id: "1",
      quantity: "50",
    });
    console.log("Result:", newProduct);

    console.log("Calling deleteProduct on id 11");
    const deletedProduct = await deleteProduct(11);
    console.log("Result:", deletedProduct);

    console.log("Calling getAllProducts");
    const products = await getAllProducts();
    console.log("Result:", products);
  } catch (error) {
    console.log("Error during testDB");
    throw error;
  }
};

module.exports = { rebuildDB, testDB };

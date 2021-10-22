const {
  createUser,
  createUserAddress,
  createShoppingSession,
  createCartItems,
} = require("..");

const createInitialUsers = async () => {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      // ! When you suck at creating fake user names, so you just pick some names you used in the past in an MMO...
      {
        username: "haru.aoi",
        password: "august2016",
        first_name: "Haru",
        last_name: "Aoi",
        telephone: "1234567890",
        email: "haruaoi.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "haru.estarriol",
        password: "september2016",
        first_name: "Haru",
        last_name: "Estarriol",
        telephone: "2345678901",
        email: "haruestarriol.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "erin.loirratse",
        password: "april2018",
        first_name: "Erin",
        last_name: "Loirratse",
        telephone: "3456789012",
        email: "erinloirratse.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "ember.elise",
        password: "november2018",
        first_name: "Ember",
        last_name: "Elise",
        telephone: "4567890123",
        email: "emberelise.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "eisha.elise",
        password: "january2019",
        first_name: "Eisha",
        last_name: "Elise",
        telephone: "5678901234",
        email: "eishaelise.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "emma.loirratse",
        password: "april2020",
        first_name: "Emma",
        last_name: "Loirratse",
        telephone: "6789012345",
        email: "emmaloirratse.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "nia.akemi",
        password: "july2021",
        first_name: "Nia",
        last_name: "Akemi",
        telephone: "8901234567",
        email: "niaakemi.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "miku.akemi",
        password: "september2021",
        first_name: "Miku",
        last_name: "Akemi",
        telephone: "9012345678",
        email: "mikuakemi.fakeemail@gmail.com",
        isAdmin: false,
      },
      {
        username: "emmaelise",
        password: "password",
        first_name: "Emma",
        last_name: "Elise",
        telephone: "9876543210",
        email: "emmaelise.fakeemail@gmail.com",
        isAdmin: true,
      },
      {
        username: "miadao",
        password: "password",
        first_name: "Mia",
        last_name: "Dao",
        telephone: "8765432109",
        email: "miadao.fakeemail@gmail.com",
        isAdmin: true,
      },
      {
        username: "seanconte",
        password: "password",
        first_name: "Sean",
        last_name: "Conte",
        telephone: "7654321098",
        email: "seanconte.fakeemail@gmail.com",
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

const createInitialUserAddresses = async () => {
  console.log("Starting to create user addresses...");
  try {
    const addressesToCreate = [
      {
        user_id: 1,
        address_line1: "10 Main St",
        address_line2: "",
        city: "Portland",
        state: "OR",
        postal_code: 12345,
        country: "United States",
        telephone: "1234567890",
        mobile: "1234567890",
      },
      {
        user_id: 2,
        address_line1: "20 First Ave",
        address_line2: "",
        city: "San Diego",
        state: "CA",
        postal_code: 23456,
        country: "United States",
        telephone: "2345678901",
        mobile: "2345678901",
      },
      {
        user_id: 3,
        address_line1: "30 Second Blvd",
        address_line2: "",
        city: "New York City",
        state: "NY",
        postal_code: 34567,
        country: "United States",
        telephone: "3456789012",
        mobile: "3456789012",
      },
      {
        user_id: 4,
        address_line1: "40 Random Rd",
        address_line2: "",
        city: "San Francisco",
        state: "CA",
        postal_code: 45678,
        country: "United States",
        telephone: "4567890123",
        mobile: "4567890123",
      },
      {
        user_id: 5,
        address_line1: "50 Sassy St",
        address_line2: "",
        city: "Sacramento",
        state: "CA",
        postal_code: 56789,
        country: "United States",
        telephone: "5678901234",
        mobile: "5678901234",
      },
      {
        user_id: 6,
        address_line1: "60 Annoyed Ave",
        address_line2: "",
        city: "Boston",
        state: "MA",
        postal_code: 67890,
        country: "United States",
        telephone: "6789012345",
        mobile: "6789012345",
      },
      {
        user_id: 7,
        address_line1: "70 Bored Blvd",
        address_line2: "",
        city: "Portland",
        state: "ME",
        postal_code: 78901,
        country: "United States",
        telephone: "8901234567",
        mobile: "8901234567",
      },
      {
        user_id: 8,
        address_line1: "80 Ridiculous Rd",
        address_line2: "",
        city: "Richmond",
        state: "VA",
        postal_code: 89012,
        country: "United States",
        telephone: "9012345678",
        mobile: "9012345678",
      },
      {
        user_id: 9,
        address_line1: "90 Satirical St",
        address_line2: "",
        city: "Los Alamos",
        state: "NM",
        postal_code: 90123,
        country: "United States",
        telephone: "9876543210",
        mobile: "9876543210",
      },
      {
        user_id: 10,
        address_line1: "100 Abstract Ave",
        address_line2: "",
        city: "Seattle",
        state: "WA",
        postal_code: 98765,
        country: "United States",
        telephone: "8765432109",
        mobile: "8765432109",
      },
      {
        user_id: 11,
        address_line1: "110 Booty Blvd",
        address_line2: "",
        city: "Tacoma",
        state: "WA",
        postal_code: 87654,
        country: "United States",
        telephone: "7654321098",
        mobile: "7654321098",
      },
    ];
    const addresses = await Promise.all(
      addressesToCreate.map(createUserAddress)
    );
    console.log("Addresses created: ");
    console.log(addresses);
    console.log("Finished creating addresses!");
  } catch (error) {
    console.error("Error creating user addresses!");
    throw error;
  }
};

const createInitialShoppingSession = async () => {
  console.log("Starting to create shopping sessions...");
  try {
    const shoppingSessionToCreate = [
      { user_id: 4, total: 42.21 },
      { user_id: 2, total: 123.54 },
      { user_id: 4, total: 80.74 },
      { user_id: 3, total: 3.64 },
      { user_id: 6, total: 45.34 },
      { user_id: 4, total: 92.33 },
      { user_id: 5, total: 50.33 },
    ];
    const shoppingSession = await Promise.all(
      shoppingSessionToCreate.map(createShoppingSession)
    );
    console.log("Shopping sessions created: ");
    console.log(shoppingSession);
    console.log("Finished creating shopping sessions!");
  } catch (error) {
    console.error("Error creating shopping sessions!");
    throw error;
  }
};

const createInitialCartItems = async () => {
  console.log("Starting to create cart items...");
  try {
    const cartItemsToCreate = [
      { session_id: 3, product_id: 5, quantity: 2 },
      { session_id: 4, product_id: 6, quantity: 1 },
      { session_id: 5, product_id: 2, quantity: 3 },
      { session_id: 2, product_id: 1, quantity: 2 },
      { session_id: 7, product_id: 10, quantity: 2 },
    ];
    // TODO: complete try block . . .
    const cartItems = await Promise.all(cartItemsToCreate.map(createCartItems));
    console.log("Cart items created: ");
    console.log(cartItems);
    console.log("Finished creating cart items");
  } catch (error) {
    console.error("Error creating cart items!");
    throw error;
  }
};

module.exports = {
  createInitialUsers,
  createInitialUserAddresses,
  createInitialShoppingSession,
  createInitialCartItems,
};

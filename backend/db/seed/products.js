const {
  createProduct,
  createProductCategory,
  createProductDiscount,
  createProductInventory,
} = require("..");


const createInitialProducts = async () => {
  try {
    console.log("creating initial products...");
    const productsToCreate = [
      {
        name: "The Apple M1 Chip",
        description: "Fast, reliable, and cutting-edge",
        SKU: "11111111",
        category_id: "2",
        price: "700",
        discount_id: "2",
        quantity: "24",
      },
      {
        name: "The Intel i7",
        description: "Zippy fast!",
        SKU: "22222222",
        category_id: "2",
        price: "700",
        discount_id: "2",
        quantity: "10",
      },
      {
        name: "The Intel i5",
        description: "The processor of yesterday",
        SKU: "33333333",
        category_id: "2",
        price: "500",
        discount_id: "2",
        quantity: "3",
      },
      {
        name: "MacBook Pro (8 core, M1 Chip, 256 GB SSD)",
        description: "For really small jobs",
        SKU: "44444444",
        category_id: "1",
        price: "2000",
        discount_id: "1",
        quantity: "2000",
      },
      {
        name: "iMac 24inch (8 core, M1 Chip, 500 GB SSD)",
        description: "I pity the branch",
        SKU: "55555555",
        category_id: "1",
        price: "2000",
        discount_id: "1",
        quantity: "20",
      },
      {
        name: "ASUS ROG Gaming PC",
        description: "Great for gaming!",
        SKU: "66666666",
        category_id: "1",
        price: "1700",
        discount_id: "1",
        quantity: "10",
      },
      {
        name: "NVIDIA GeForce RTX 3080",
        description: "Limited Stock",
        SKU: "7777777",
        category_id: "3",
        price: "999",
        discount_id: "3",
        quantity: "1",
      },
      {
        name: "AMD Radeon Pro W5700",
        description: "For the contrarian",
        SKU: "88888888",
        category_id: "3",
        price: "500",
        discount_id: "3",
        quantity: "9",
      },
      {
        name: "Lenovo ThinkStation NVIDIA Quatro",
        description: "Pre-build featuring 48 GB of GDDR6",
        SKU: "99999999",
        category_id: "1",
        price: "5000",
        discount_id: "1",
        quantity: "5",
      },
      {
        name: "NVIDIA Alienware X17 Gaming Laptop",
        description: "Available with multiple memory options",
        SKU: "10000000",
        category_id: "1",
        price: "2200",
        discount_id: "1",
        quantity: "30",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log("Products Created: ", products);
    console.log("Finished Creating Products!");
  } catch (error) {
    throw error;
  }
};

const createInitialProductCategories = async () => {
  try {
    console.log("creating initial categories...");
    const categoriesToCreate = [
      {
        name: "Pre-Built PCs",
        description:
          "Why bother with a custom build?",
      },
      {
        name: "Processor Chips",
        description: "The beating heart of any PC",
      },
      {
        name: "Graphics Cards",
        description:
          "For gaming, video editing, and other high-end uses",
      },
      {
        name: "Uncategorized/Miscellaneous",
        description: "For one-off items, or those that can't be categorized"
      }
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createProductCategory)
    );
    console.log("Categories Created: ", categories);
    console.log("Finished Creating Categories!");
  } catch (error) {
    throw error;
  }
};

const createInitialProductInventory = async () => {
  console.log("Starting to create product inventory...");
  try {
    const inventoryToCreate = [
      { quantity: 1 },
      { quantity: 3 },
      { quantity: 7 },
      { quantity: 21 },
      { quantity: 4 },
      { quantity: 9 },
      { quantity: 987 },
      { quantity: 4 },
      { quantity: 3 },
      { quantity: 55 },
    ];
    // TODO: complete try block . . .
    const inventory = await Promise.all(
      inventoryToCreate.map(createProductInventory)
    );
    console.log("Inventory Created: ", inventory);
    console.log("Finished Creating Product Inventory");
  } catch (error) {
    console.error("Error creating product inventory!");
    throw error;
  }
};

const createInitialProductDiscounts = async () => {
  console.log("Starting to create product discount...");
  try {
    const discountsToCreate = [
      {
        name: "Pre-Built Discount",
        description: "Discounts on Select Pre-Built Machines",
        discount_percent: 5,
        active: false,
      },
      {
        name: "Processor Discounts",
        description: "Discounts on Select Processor Chips",
        discount_percent: 15,
        active: false,
      },
      {
        name: "Graphics Card Discounts",
        description: "Discounts on Select Graphics Cards",
        discount_percent: 99,
        active: true,
      },
      {
        name: "No Discount",
        description: "For items that have no discount",
        discount_percent: 0,
        active: false
      }
    ];
    // TODO: complete try block . . .
    const discounts = await Promise.all(
      discountsToCreate.map(createProductDiscount)
    );
    console.log("Discounts Created: ", discounts);
    console.log("Finished creating discounts!");
  } catch (error) {
    console.error("Error creating product discount!");
    throw error;
  }
};

module.exports = {
  createInitialProducts,
  createInitialProductCategories,
  createInitialProductInventory,
  createInitialProductDiscounts,
};

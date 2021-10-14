const {
  createProduct,
  createDiscount,
  createProductCategory
} = require('../adapters/products')

const createInitialProducts = async () => {
  try {
    console.log("creating initial products...");
    const productsToCreate = [
      {
        name: "Tree Ripper 3000",
        description: "Powered by diesel gas",
        SKU: "11111111",
        category_id: "1",
        inventory_id: "1",
        price: "$200",
        discount_id: "1",
      },
      {
        name: "The Earth Destroyer 5.0",
        description: "Cuts even ancient growth",
        SKU: "22222222",
        category_id: "1",
        inventory_id: "2",
        price: "$100",
        discount_id: "1",
      },
      {
        name: "The Hedge Trimmer",
        description: "For small jobs",
        SKU: "33333333",
        category_id: "2",
        inventory_id: "3",
        price: "$50",
        discount_id: "3",
      },
      {
        name: "The Simple Garden Shears",
        description: "For really small jobs",
        SKU: "44444444",
        category_id: "2",
        inventory_id: "4",
        price: "$20",
        discount_id: "2",
      },
      {
        name: "The Branch Mangler",
        description: "I pity the branch",
        SKU: "55555555",
        category_id: "1",
        inventory_id: "5",
        price: "$500",
        discount_id: "1",
      },
      {
        name: "The Wood Pulverizer Mark II",
        description: "Trees cower at his gaze",
        SKU: "66666666",
        category_id: "1",
        inventory_id: "6",
        price: "$750",
        discount_id: "1",
      },
      {
        name: "The Psycho Woodchuck Woodchipper",
        description: "Now you see a tree, now you do not...",
        SKU: "7777777",
        category_id: "3",
        inventory_id: "7",
        price: "$999",
        discount_id: "4",
      },
      {
        name: "The Lawn Shredder (bluetooth enabled)",
        description: "Grass doesnt even stand a chance",
        SKU: "88888888",
        category_id: "4",
        inventory_id: "8",
        price: "$299",
        discount_id: "3",
      },
      {
        name: "The Weed Eviscerator",
        description: "Kiss those pesky weeds goodbye...or dont",
        SKU: "99999999",
        category_id: "2",
        inventory_id: "9",
        price: "$100",
        discount_id: "3",
      },
      {
        name: "The Vine Massacre-Maker",
        description: "This could get ugly...for vines",
        SKU: "10000000",
        category_id: "2",
        inventory_id: "10",
        price: "$3200",
        discount_id: "3",
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
        name: "Chainsaws",
        description:
          "Everything you need to destroy a tree...what did it ever do for you?",
      },
      {
        name: "Hand Tools",
        description: "For those too afraid of a motorized blade",
      },
      {
        name: "Powered Lawn Tools",
        description:
          "These powered lawn tools will keep your property mowed, hedged, de-weeded, and de-vined",
      },
    ];
    const categories = await Promise.all(
      categoriesToCreate.map(createProductCategory)
    );
    console.log("Categories Created: ", categories);
    console.log("Finished Creating Categories!");
  } catch (error){
    throw error
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
        name: "Chainsaw Discount",
        desc: "description 1",
        discount_percent: 5,
        active: false,
      },
      {
        name: "Hand Tool Discount",
        desc: "description 2",
        discount_percent: 15,
        active: false,
      },
      {
        name: "Powered Lawn Tool Discount",
        desc: "description 3",
        discount_percent: 99,
        active: true,
      },
      {
        name: "Large Machine Discount",
        desc: "description 4",
        discount_percent: 1,
        active: true,
      },
    ];
    // TODO: complete try block . . .
    const discounts = await Promise.all(discountsToCreate.map(createDiscount));
    console.log('Discounts Created: ', discounts)
    console.log('Finished creating discounts!')
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

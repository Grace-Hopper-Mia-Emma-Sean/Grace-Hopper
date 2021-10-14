const createInitialUserPayment = async () => {
  console.log("Starting to create user payment...");
  try {
    const userPaymentsToCreate = [
      {
        user_id: 1,
        payment_type: "credit",
        provider: "Visa",
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
        provider: "Visa",
        account_no: 3456789012345678,
        expiry: 0322,
      },
      {
        user_id: 4,
        payment_type: "debit",
        provider: "Visa",
        account_no: 4567890123456789,
        expiry: 0422,
      },
      {
        user_id: 5,
        payment_type: "debit",
        provider: "Visa",
        account_no: 5678901234567890,
        expiry: 0523,
      },
      {
        user_id: 6,
        payment_type: "credit",
        provider: "Visa",
        account_no: 6789012345678901,
        expiry: 0623,
      },
      {
        user_id: 7,
        payment_type: "debit",
        provider: "Visa",
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
        provider: "Visa",
        account_no: 9012345678901234,
        expiry: 0924,
      },
      {
        user_id: 10,
        payment_type: "debit",
        provider: "Visa",
        account_no: 9876543210987654,
        expiry: 1024,
      },
      {
        user_id: 11,
        payment_type: "credit",
        provider: "Visa",
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

const createInitialPaymentDetails = async () => {
  console.log("Starting to create payment details...");
  try {
    const paymentDetailsToCreate = [
      { order_id: 2, amount: 34.2, provider: "Visa", status: true },
      { order_id: 4, amount: 80.0, provider: "MasterCard", status: true },
      { order_id: 3, amount: 100.21, provider: "MasterCard", status: false },
      { order_id: 6, amount: 98.22, provider: "Visa", status: true },
      { order_id: 12, amount: 11.16, provider: "Visa", status: true },
    ];
    // TODO: complete try block . . .
  } catch (error) {
    console.error("Error creating payment items!");
    throw error;
  }
};

module.exports = { createInitialUserPayment, createInitialPaymentDetails };

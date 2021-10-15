const { createPaymentDetails } = require("../adapters/payment_details");

const { createUserPayment } = require("../adapters/user_payment");

const createInitialUserPayment = async () => {
  console.log("Starting to create user payment...");
  try {
    const userPaymentsToCreate = [
      {
        user_id: "1",
        payment_type: "credit",
        provider: "Visa",
        account_no: 1234567890123456,
        expiry: "2022-01-31",
      },
      {
        user_id: "2",
        payment_type: "credit",
        provider: "MasterCard",
        account_no: 2345678901234567,
        expiry: "2022-02-28",
      },
      {
        user_id: "3",
        payment_type: "credit",
        provider: "Visa",
        account_no: 3456789012345678,
        expiry: "2022-03-31",
      },
      {
        user_id: "4",
        payment_type: "debit",
        provider: "Visa",
        account_no: 4567890123456789,
        expiry: "2022-04-30",
      },
      {
        user_id: "5",
        payment_type: "debit",
        provider: "Visa",
        account_no: 5678901234567890,
        expiry: "2022-05-31",
      },
      {
        user_id: "6",
        payment_type: "credit",
        provider: "Visa",
        account_no: 6789012345678901,
        expiry: "2023-06-30",
      },
      {
        user_id: "7",
        payment_type: "debit",
        provider: "Visa",
        account_no: 7890123456789012,
        expiry: "2023-07-31",
      },
      {
        user_id: "8",
        payment_type: "debit",
        provider: "MasterCard",
        account_no: 8901234567890123,
        expiry: "2023-08-31",
      },
      {
        user_id: "9",
        payment_type: "credit",
        provider: "Visa",
        account_no: 902345678901234,
        expiry: "2023-09-30",
      },
      {
        user_id: "10",
        payment_type: "debit",
        provider: "Visa",
        account_no: 986543210987654,
        expiry: "2023-10-31",
      },
      {
        user_id: "11",
        payment_type: "credit",
        provider: "Visa",
        account_no: 8765432109876543,
        expiry: "2023-11-30",
      },
    ];
    const userPayment = await Promise.all(
      userPaymentsToCreate.map(createUserPayment)
    );
    console.log("User Payment created:", userPayment);
    console.log("Finished creating user payment!");
  } catch (error) {
    console.error("Error creating user payment!");
    throw error;
  }
};

const createInitialPaymentDetails = async () => {
  console.log("Starting to create payment details...");
  try {
    const paymentDetailsToCreate = [
      { order_id: "2", amount: 34.2, provider: "Visa", status: true },
      { order_id: "4", amount: 80.0, provider: "MasterCard", status: true },
      { order_id: "3", amount: 100.21, provider: "MasterCard", status: false },
      { order_id: "6", amount: 98.22, provider: "Visa", status: true },
      { order_id: "12", amount: 11.16, provider: "Visa", status: true },
    ];

    const paymentDetails = await Promise.all(
      paymentDetailsToCreate.map(createPaymentDetails)
    );
    console.log("User Payment details:", paymentDetails);
    console.log("Finished creating payment details!");
  } catch (error) {
    console.error("Error creating payment items!");
    throw error;
  }
};

module.exports = { createInitialUserPayment, createInitialPaymentDetails };

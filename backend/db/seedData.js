const client = require('./client');

const {
  //TO DO: call db components
} = require('./index')

async function dropTables() {
  
  try {
    console.log('Dropping All Tables...');

    await client.query(`
    // TO DO








    `);
    console.log('Finished dropping tables!')
  }catch (error) {
    console.error("Error dropping table!")
    throw error;
  }
}

async function createTables() {

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
    console.error("Error dropping table!")
    throw error;
  }
}



async function createInitialUsers() {
  console.log('Starting to create users...');
  try {

    const usersToCreate = [
      // TO DO
    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}
//SAMPLE BELOW:
// async function createInitialActivities() {
//   try {
//     console.log('Starting to create activities...');

//     const activitiesToCreate = [
//       { name: 'wide-grip standing barbell curl', description: 'Lift that barbell!' },
//       { name: 'Incline Dumbbell Hammer Curl', description: 'Lie down face up on an incline bench and lift thee barbells slowly upward toward chest' },
//       { name: 'bench press', description: 'Lift a safe amount, but push yourself!' },
//       { name: 'Push Ups', description: 'Pretty sure you know what to do!' },
//       { name: 'squats', description: 'Heavy lifting.' },
//       { name: 'treadmill', description: 'running' },
//       { name: 'stairs', description: 'climb those stairs' },
//     ]
//     const activities = await Promise.all(activitiesToCreate.map(createActivity));

//     console.log('activities created:');
//     console.log(activities);

//     console.log('Finished creating activities!');
//   } catch (error) {
//     console.error('Error creating activities!');
//     throw error;
//   }
// }

//SAMPLE BELOW
// async function createInitialRoutines() {
//   try {
//     console.log('starting to create routines...');

//     const routinesToCreate = [
//       {creatorId: 2, isPublic: false, name: 'Bicep Day', goal: 'Work the Back and Biceps.'},
//       {creatorId: 1, isPublic: true, name: 'Chest Day', goal: 'To beef up the Chest and Triceps!'},
//       {creatorId: 1, isPublic: false, name: 'Leg Day', goal: 'Running, stairs, squats'},
//       {creatorId: 2, isPublic: true, name: 'Cardio Day', goal: 'Running, stairs. Stuff that gets your heart pumping!'},
//     ]
//     const routines = await Promise.all(routinesToCreate.map(routine => createRoutine(routine)));
//     console.log('Routines Created: ', routines)
//     console.log('Finished creating routines.')
//   } catch (error) {
//     throw error;
//   }
// }


//SAMPLE BELOW:
// async function createInitialRoutineActivities() {
//   try {
//     console.log('starting to create routine_activities...');
//     const [bicepRoutine, chestRoutine, legRoutine, cardioRoutine] = await getRoutinesWithoutActivities();
//     const [bicep1, bicep2, chest1, chest2, leg1, leg2, leg3] = await getAllActivities();

//     const routineActivitiesToCreate = [
//       {
//         routineId: bicepRoutine.id,
//         activityId: bicep1.id,
//         count: 10,
//         duration: 5 
//       },
//       {
//         routineId: bicepRoutine.id,
//         activityId: bicep2.id,
//         count: 10,
//         duration: 8 
//       },
//       {
//         routineId: chestRoutine.id,
//         activityId: chest1.id,
//         count: 10,
//         duration: 8 
//       },
//       {
//         routineId: chestRoutine.id,
//         activityId: chest2.id,
//         count: 10,
//         duration: 7 
//       },
//       {
//         routineId: legRoutine.id,
//         activityId: leg1.id,
//         count: 10,
//         duration: 9 
//       },
//       {
//         routineId: legRoutine.id,
//         activityId: leg2.id,
//         count: 10,
//         duration: 10 
//       },
//       {
//         routineId: legRoutine.id,
//         activityId: leg3.id,
//         count: 10,
//         duration: 7 
//       },
//       {
//         routineId: cardioRoutine.id,
//         activityId: leg2.id,
//         count: 10,
//         duration: 10 
//       },
//       {
//         routineId: cardioRoutine.id,
//         activityId: leg3.id,
//         count: 10,
//         duration: 15 
//       },
//     ]
//     const routineActivities = await Promise.all(routineActivitiesToCreate.map(addActivityToRoutine));
//     console.log('routine_activities created: ', routineActivities)
//     console.log('Finished creating routine_activities!')
//   } catch (error) {
//     throw error;
//   }
// }

//SAMPLE rebuildDB() below:
// async function rebuildDB() {
//   try {
//     client.connect();
//     await dropTables();
//     await createTables();
//     await createInitialUsers();
//     await createInitialActivities();
//     await createInitialRoutines();
//     await createInitialRoutineActivities();

//   } catch (error) {
//     console.log('Error during rebuildDB')
//     throw error;
//   } 
  // finally {
  //   client.end()
  // }
}

module.exports = { 
  rebuildDB 
};


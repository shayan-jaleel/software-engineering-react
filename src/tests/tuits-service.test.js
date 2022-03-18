/**
* @jest-environment node
*/
import {
  createUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";
import {
  createTuit,
  deleteTuit, findTuitByUser,
  findTuitById,
  findAllTuits
} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    // sample user which will insert tuit
    const ripley = {
      username: 'ellenripley',
      password: 'lv426',
      email: 'ellenripley@aliens.com'
    };
    // tuit that will be inserted
    const tuit = {
      tuit: 'i am ripley'  
    }
    let returnedTuit = undefined;
    let returnedUser = undefined;
    // setup test before running test
    beforeAll(async () => {
      // remove any/all users to make sure we create it in the test
      await deleteUsersByUsername(ripley.username);
      // create a new user for our test
      returnedUser = await createUser(ripley);
    })
  
    // clean up after test runs
    afterAll(async () => {
      // remove any data we created, including the tuit and the user that posted it
      console.log(returnedUser);
      console.log(returnedTuit);
      await deleteUsersByUsername(ripley.username);
      if(returnedTuit) {
        await deleteTuit(returnedTuit._id);
      }
    })
 
    test('can insert new tuits with REST API', async () => {
      // insert new tuit in the database
      returnedTuit = await createTuit(returnedUser._id, tuit);
      // verify inserted tuit's properties match
      expect(returnedTuit.tuit).toEqual(tuit.tuit);
      expect(returnedTuit.postedBy).toEqual(returnedUser._id);
    });
  
});

describe('can delete tuit wtih REST API', () => {
  let returnedTuit = undefined;
  let returnedUser = undefined;
  // sample user which will insert tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };
  // setup test before running test
  beforeAll(async () => {
    // tuit that will be inserted
    const tuit = {
      tuit: 'i am ripley'  
    }
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    // create a new user for our test
    returnedUser = await createUser(ripley);
    // insert new tuit in the database
    returnedTuit = await createTuit(returnedUser._id, tuit);
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created, including the tuit and the user that posted it
    console.log(returnedUser);
    console.log(returnedTuit);
    await deleteUsersByUsername(ripley.username);
    if(returnedTuit) {
      await deleteTuit(returnedTuit._id);
    }
  })

  test('can delete existing tuits with REST API', async () => {
    // verify we deleted at least one tuit
    const status = await deleteTuit(returnedTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });

});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // sample user which will insert tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };
  // tuit that will be inserted
  const tuit = {
    tuit: 'i am ripley'  
  }
  let returnedTuit = undefined;
  let returnedUser = undefined;
  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    // create a new user for our test
    returnedUser = await createUser(ripley);
    // insert new tuit in the database
    returnedTuit = await createTuit(returnedUser._id, tuit);
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created, including the tuit and the user that posted it
    console.log(returnedUser);
    console.log(returnedTuit);
    await deleteUsersByUsername(ripley.username);
    if(returnedTuit) {
      await deleteTuit(returnedTuit._id);
    }
  })

  test('can get tuit by id with REST API', async () => {
    const returnedTuitById = await findTuitById(returnedTuit._id);
    // verify retrieved tuit's properties match what was inserted
    expect(returnedTuitById.tuit).toEqual(tuit.tuit);
    expect(returnedTuitById.postedBy._id).toEqual(returnedUser._id);
  });

});

describe('can retrieve all tuits with REST API', () => {
  jest.setTimeout(30000);
  // TODO: implement this
  // sample user which will insert tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };
  // tuit that will be inserted
  const tuits = [
    'i am ripley1',
    'i am ripley2'
  ];
  let returnedTuits = [];
  let returnedUser = undefined;
  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    // create a new user for our test
    returnedUser = await createUser(ripley);
    // insert new tuits in the database
    const firstTuit = await createTuit(returnedUser._id, {tuit: tuits[0]});
    const secondTuit = await createTuit(returnedUser._id, {tuit: tuits[1]});
    // tuits.forEach(async tuit => {
    //   const curTuit = await createTuit(returnedUser._id, {tuit});
    //   returnedTuits.push(curTuit);
    // });
    returnedTuits.push(firstTuit);
    returnedTuits.push(secondTuit);
    console.log(JSON.stringify(returnedTuits));
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created, including the tuit and the user that posted it
    console.log(returnedUser);
    console.log(returnedTuits);
    await deleteUsersByUsername(ripley.username);
    if(returnedTuits) {
      returnedTuits.forEach(async t => await deleteTuit(t._id));
    }
  })

  test('can retrieve all tuits with REST API', async () => {
    // expect(1).toBe(1);
    // insert new tuit in the database
    const allTuits = await findAllTuits();

    // there should be a minimum number of tuits
    expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);
    
    // let's check each user we inserted
    const tuitsWeInsertedReturned = allTuits.filter(
      t => tuits.indexOf(t.tuit) >= 0);
      console.log("tuitsWeInsertedReturned = " + JSON.stringify(tuitsWeInsertedReturned));
      
    // compare the actual users in database with the ones we sent
    tuitsWeInsertedReturned.forEach(t => {
      const curTuitString = tuits.find(tuitString => tuitString === t.tuit);
      expect(t.tuit).toEqual(curTuitString);
      expect(t.postedBy).toEqual(returnedUser._id);
    });
  });

});
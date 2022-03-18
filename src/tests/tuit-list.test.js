import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

let dummyTuits = MOCKED_TUITS.map((mockedTuit, index) => {
  return ({
    tuit: mockedTuit,
    postedBy: MOCKED_USERS[index]
  });
});

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={dummyTuits}></Tuits>
    </HashRouter>
  );
  const alice_tuit = screen.getByText(/alice's tuit/i);
  expect(alice_tuit).toBeInTheDocument();
  const bob_tuit = screen.getByText(/bob's tuit/i);
  expect(bob_tuit).toBeInTheDocument();
  const charlie_tuit = screen.getByText(/charlie's tuit/i);
  expect(charlie_tuit).toBeInTheDocument();
});

// NOTE: This test is implemented in another file (tuit-list-2.test.js)

// test('tuit list renders async', async () => {
//   // TODO: implement this
// })

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: {tuits: dummyTuits} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  
  render(
    <HashRouter>
      <Tuits tuits={dummyTuits}></Tuits>
    </HashRouter>
  );
  const alice_tuit = screen.getByText(/alice's tuit/i);
  expect(alice_tuit).toBeInTheDocument();
  const bob_tuit = screen.getByText(/bob's tuit/i);
  expect(bob_tuit).toBeInTheDocument();
  const charlie_tuit = screen.getByText(/charlie's tuit/i);
  expect(charlie_tuit).toBeInTheDocument();
});

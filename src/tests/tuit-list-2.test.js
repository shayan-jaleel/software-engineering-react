import Tuits from "../components/tuits";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";


test('tuit list renders async', async () => {
    const retrievedTuits = await findAllTuits();
    render(
      <HashRouter>
        <Tuits tuits={retrievedTuits}></Tuits>
      </HashRouter>
    );
    const hello_tuit = screen.getByText(/hello/i);
    expect(hello_tuit).toBeInTheDocument();
})

// test('user list renders async', async () => {
//     const users = await findAllUsers();
//     render(
//       <HashRouter>
//         <UserList users={users}/>
//       </HashRouter>);
//     const linkElement = screen.getByText(/shayan/i);
//     expect(linkElement).toBeInTheDocument();
//   })
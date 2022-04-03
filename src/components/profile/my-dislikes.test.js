import axios from 'axios';
import {act, render, screen} from "@testing-library/react";
import React from "react";
import MyDislikes from "./my-dislikes"

const MOCKED_TUITS = [
    {tuit: "hello, im alice", postedBy: {username: "Alice", email: "alice@wonderland.com"}, _id: "111"},
    {tuit: "hello, im bob", postedBy: {username: "Bob", email: "bob@bob.bob"}, _id: "000"}
];

describe('Test My Dislikes', () => {
    const mock = jest.spyOn(axios, 'get');
    afterEach(() => {
        mock.mockRestore();
    })

    test("Test my dislikes component", async () => {
        mock.mockImplementation(() => {
            return Promise.resolve({data: {tuits: MOCKED_TUITS}})
        });
        act(() => {
            render(
                <MyDislikes/>
            );
        });
        const tuit = screen.getByText(/bob/i);
        expect(tuit).toBeInTheDocument();
    });
})
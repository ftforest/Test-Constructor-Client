import React, { createContext, useState, useContext } from "react";
import testsData from '../data/my-tests.json';

const TestContext = createContext();
export const useTests = () => useContext(TestContext);

export default function TestProvider({ children }) {
    const [tests, setTests] = useState(testsData);

    function TestEdit(id,e) {
        console.log('TestEdit')
        console.log(id,'id')
    }

    function TestDelete(id,e) {
        console.log('TestDelete')
        console.log(id,'id')
    }

    function TestView(id,e) {
        console.log('TestView')
        console.log(id,'id')
    }

    return (
        <TestContext.Provider value={{ tests, TestEdit, TestDelete, TestView }}>
            {children}
        </TestContext.Provider>
    );
}

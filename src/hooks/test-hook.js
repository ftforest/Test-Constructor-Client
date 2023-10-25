import React, { createContext, useState, useContext } from "react";
import testsData from '../data/my-tests.json';
import {
    storeAddElement,
    storeEditElements,
    storeGetElementsForParam,
    storeSetElementForParam, storeUpdateElementFields
} from "../functions/storege";
import {print} from "../functions/helpers";
import {useStates} from "../components/bootstrap/StateProvider";

const TestContext = createContext();
export const useTests = () => useContext(TestContext);

export default function TestProvider({ children }) {
    const [tests, setTests] = useState(testsData);




    return (
        <TestContext.Provider value={{ tests }}>
            {children}
        </TestContext.Provider>
    );
}

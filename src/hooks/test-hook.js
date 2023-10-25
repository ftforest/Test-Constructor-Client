import React, { createContext, useState, useContext } from "react";
import testsData from '../data/my-tests.json';
import {storeGetParam} from "../functions/storege";

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

        let data = tests.filter(item => item.id != id);
        setTests(data);
    }

    function TestView(id,e) {
        console.log('TestView')
        console.log(id,'id')

        window.location.href = '/my-tests-page/view/'+id;
    }

    function TestGetId(id) {
        let oneTest = tests.filter(item => item.id == id)[0]
        return oneTest
    }

    return (
        <TestContext.Provider value={{ tests, TestEdit, TestDelete, TestView, TestGetId }}>
            {children}
        </TestContext.Provider>
    );
}

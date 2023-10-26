import React, {createContext, useState, useContext, useEffect} from "react";
import testsDataJson from '../data/my-tests.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";

const TestContext = createContext();
export const useTests = () => useContext(TestContext);

export default function TestProvider({ children, globalStore }) {
    const NameElement = 'tests'
    console.log(globalStore,'globalStore')
    let testsData = []
    if (globalStore == 'state') {
        testsData = testsDataJson
    }
    if (globalStore == 'storeg') {
        testsData = getData(NameElement,testsDataJson) ? testsDataJson : storeGetParam(NameElement)
    }
    let [tests, setTests] = useState(testsData);

    const structure = {
        'id': '',
        'title': '',
        'author_id': '',
        'created_at': ''
    }

    function getData(NameElement,testsDataJson) {
        if (storeGetParam(NameElement).length == 0) {
            storeSaveReWtite(NameElement,testsDataJson)
            return true
        } else {
            return false
        }
    }

    function saveData(tests,NameElement,globalStore,testsDataJson = []) {

        return testsData
    }

    function TestSave(el) {
        console.log('TestSave')
        setTests([...tests,el])
        storeSaveReWtite('tests',[...tests,el])
        //saveData(NameElement,globalStore,[...tests,el])
    }

    function TestEdit(id,e) {
        console.log('TestEdit')
        console.log(id,'id')
    }

    function TestDelete(id,e) {
        console.log('TestDelete')
        console.log(id,'id')

        let data = tests.filter(item => item.id != id);
        //saveData(NameElement,globalStore,[...data])
        setTests(data);
        storeSaveReWtite('tests',data)
    }

    function TestView(id,e) {
        console.log('TestView')
        console.log(id,'id')

        window.location.href = '/test/view/'+id;
    }

    function TestGetId(id) {
        let oneTest = tests.filter(item => item.id == id)[0]
        return oneTest
    }

    return (
        <TestContext.Provider value={{ NameElement, tests, TestEdit, TestDelete, TestView, TestGetId, structure, TestSave }}>
            {children}
        </TestContext.Provider>
    );
}

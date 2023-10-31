import React, {createContext, useState, useContext, useEffect} from "react";
import testsDataJson from '../data/my-tests.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";
import {getData} from "../functions/helpers";

const TestContext = createContext();
export const useTests = () => useContext(TestContext);

export default function TestProvider({ children, globalStore }) {
    const NameElement = 'tests'
    
    let testsData = []
    if (globalStore == 'state') {
        testsData = testsDataJson
    }
    if (globalStore == 'storeg') {
        testsData = getData(NameElement,testsDataJson) ? testsDataJson : storeGetParam(NameElement)
    }
    let [tests, setTests] = useState(testsData);

    const structure = {
        'id': {
            'value':'',
            'type':'text',
        },
        'title': {
            'value':'',
            'type':'text',
        },
        'author_id': {
            'value':'addId',
            'type':'text',
        },
        'created_at': {
            'value':'2018-07-22',
            'type':'date',
        }
    }

    function TestSave(el,update = false) {
        

        if (update) {
            let data = tests.filter(item => item.id != el.id)
            setTests([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setTests([...tests,el])
            storeSaveReWtite(NameElement,[...tests,el])
        }
    }

    function TestEdit(id,addId,e) {
        
        

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function TestDelete(id,e) {
        
        

        let data = tests.filter(item => item.id != id);
        setTests(data);
        storeSaveReWtite(NameElement,data)
    }

    function TestView(id,e) {
        
        

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

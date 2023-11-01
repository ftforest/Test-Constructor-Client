import React, {createContext, useState, useContext, useEffect} from "react";
import completedTestsDataJson from '../data/my-completedTests.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";
import {getData} from "../functions/helpers";

const CompletedTestContext = createContext();
export const useCompletedTests = () => useContext(CompletedTestContext);

export default function CompletedTestProvider({ children, globalStore }) {
    const NameElement = 'completedTests'
    
    let completedTestsData = []
    if (globalStore == 'state') {
        completedTestsData = completedTestsDataJson
    }
    if (globalStore == 'storeg') {
        completedTestsData = getData(NameElement,completedTestsDataJson) ? completedTestsDataJson : storeGetParam(NameElement)
    }
    let [completedTests, setCompletedTests] = useState(completedTestsData);

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

    function CompletedTestSave(el,update = false) {
        

        if (update) {
            let data = completedTests.filter(item => item.id != el.id)
            setCompletedTests([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setCompletedTests([...completedTests,el])
            storeSaveReWtite(NameElement,[...completedTests,el])
        }
    }

    function CompletedTestEdit(id,addId,e) {
        
        

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function CompletedTestDelete(id,e) {
        
        

        let data = completedTests.filter(item => item.id != id);
        setCompletedTests(data);
        storeSaveReWtite(NameElement,data)
    }

    function CompletedTestView(id,e) {
        
        

        window.location.href = '/completedTest/view/'+id;
    }

    function CompletedTestGetId(id) {
        let oneCompletedTest = completedTests.filter(item => item.id == id)[0]
        return oneCompletedTest
    }

    return (
        <CompletedTestContext.Provider value={{ NameElement, completedTests, CompletedTestEdit, CompletedTestDelete, CompletedTestView, CompletedTestGetId, structure, CompletedTestSave }}>
            {children}
        </CompletedTestContext.Provider>
    );
}

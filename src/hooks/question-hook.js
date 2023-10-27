import React, { createContext, useState, useContext } from "react";
import questionsDataJson from '../data/questions.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";
import {getData} from "../functions/helpers";

const QuestionContext = createContext();
export const useQuestions = () => useContext(QuestionContext);

export default function QuestionProvider({ children, globalStore  }) {
    const NameElement = 'questions'
    console.log(globalStore,'globalStore')
    let questionsData = []
    if (globalStore == 'state') {
        questionsData = questionsDataJson
    }
    if (globalStore == 'storeg') {
        questionsData = getData(NameElement,questionsDataJson) ? questionsDataJson : storeGetParam(NameElement)
    }
    const [questions, setQuestions] = useState(questionsData);

    const structure = {
        'id': {
            'value':'',
            'type':'text',
        },
        'description': {
            'value':'',
            'type':'text',
        },
        'test_id': {
            'value':'addId',
            'type':'text',
        },
        'type': {
            'value':'',
            'type':'text',
        },
        'order': {
            'value':'2',
            'type':'text',
        }
    }

    function QuestionSave(el,update = false) {
        console.log('QuestionSave')

        if (update) {
            let data = questions.filter(item => item.id != el.id)
            setQuestions([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setQuestions([...questions,el])
            storeSaveReWtite(NameElement,[...questions,el])
        }
    }

    function QuestionEdit(id,addId,e) {
        console.log('QuestionEdit')
        console.log(id,'id')

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function QuestionDelete(id,e) {
        console.log('QuestionDelete')
        console.log(id,'id')

        let data = questions.filter(item => item.id != id);
        setQuestions(data);
        storeSaveReWtite(NameElement,data)
    }

    function QuestionView(id,e) {
        console.log('QuestionView')
        console.log(id,'id')

        window.location.href = '/question/view/'+id;
    }

    function QuestionGetId(id) {
        let oneQuestion = questions.filter(item => item.id == id)[0]
        return oneQuestion
    }

    function QuestionGetTestId(test_id) {
        let listQuestion = questions.filter(item => item.test_id == test_id)
        return listQuestion
    }

    return (
        <QuestionContext.Provider value={{ questions, QuestionEdit, QuestionDelete, QuestionView, QuestionGetId,QuestionGetTestId, NameElement, structure, QuestionSave }}>
            {children}
        </QuestionContext.Provider>
    );
}

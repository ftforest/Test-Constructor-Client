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
        'id': '',
        'description': '',
        'test_id': 'addId',
        'type': '',
        'order': ''
    }

    function QuestionSave(el) {
        console.log('QuestionSave')
        setQuestions([...questions,el])
        storeSaveReWtite(NameElement,[...questions,el])
    }

    function QuestionEdit(id,e) {
        console.log('QuestionEdit')
        console.log(id,'id')
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

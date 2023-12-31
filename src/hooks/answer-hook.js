import React, { createContext, useState, useContext } from "react";
import answersDataJson from '../data/answers.json';
import {getData} from "../functions/helpers";
import {storeGetParam, storeSaveReWtite} from "../functions/storege";

const AnswerContext = createContext();
export const useAnswers = () => useContext(AnswerContext);

export default function AnswerProvider({ children, globalStore }) {
    const NameElement = 'answers'
    let answersData = []
    if (globalStore == 'state') {
        answersData = answersDataJson
    }
    if (globalStore == 'storeg') {
        answersData = getData(NameElement,answersDataJson) ? answersDataJson : storeGetParam(NameElement)
    }
    const [answers, setAnswers] = useState(answersData);

    const structure = {
        'id': {
            'value':'',
            'type':'text',
        },
        'value': {
            'value':'',
            'type':'text',
        },
        'correct': {
            'value':'',
            'type':'text',
        },
        'question_id': {
            'value':'addId',
            'type':'text',
        }
    }

    function AnswerSave(el,update = false) {
        console.log('AnswerSave')

        if (update) {
            let data = answers.filter(item => item.id != el.id)
            setAnswers([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setAnswers([...answers,el])
            storeSaveReWtite(NameElement,[...answers,el])
        }
    }

    function AnswerEdit(id,addId,e) {
        console.log('AnswerEdit')
        console.log(id,'id')

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function AnswerDelete(id,e) {
        console.log('AnswerDelete')
        console.log(id,'id')

        let data = answers.filter(item => item.id != id);
        setAnswers(data);
        storeSaveReWtite(NameElement,data)
    }

    function AnswerView(id,e) {
        console.log('AnswerView')
        console.log(id,'id')

        window.location.href = '/my-answers-page/view/'+id;
    }

    function AnswerGetId(id) {
        let oneAnswer = answers.filter(item => item.id == id)[0]
        return oneAnswer
    }

    function AnswerGetQuestionId(question_id) {
        let listAnswer = answers.filter(item => item.question_id == question_id)
        return listAnswer
    }

    return (
        <AnswerContext.Provider value={{ answers, AnswerEdit, AnswerDelete, AnswerView, AnswerGetId,AnswerGetQuestionId, NameElement, structure, AnswerSave }}>
            {children}
        </AnswerContext.Provider>
    );
}

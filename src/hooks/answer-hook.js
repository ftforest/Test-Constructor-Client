import React, { createContext, useState, useContext } from "react";
import answersData from '../data/answers.json';

const AnswerContext = createContext();
export const useAnswers = () => useContext(AnswerContext);

export default function AnswerProvider({ children }) {
    const [answers, setAnswers] = useState(answersData);
    const NameElement = 'answer'

    const structure = {
        'id': '',
        'value': '',
        'correct': '',
        'question_id': ''
    }

    function AnswerSave(el) {
        console.log('AnswerSave')
        setAnswers([...answers,el])
    }

    function AnswerEdit(id,e) {
        console.log('AnswerEdit')
        console.log(id,'id')
    }

    function AnswerDelete(id,e) {
        console.log('AnswerDelete')
        console.log(id,'id')

        let data = answers.filter(item => item.id != id);
        setAnswers(data);
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

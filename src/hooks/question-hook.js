import React, { createContext, useState, useContext } from "react";
import questionsData from '../data/questions.json';

const QuestionContext = createContext();
export const useQuestions = () => useContext(QuestionContext);

export default function QuestionProvider({ children }) {
    const [questions, setQuestions] = useState(questionsData);
    const NameElement = 'question'

    function QuestionEdit(id,e) {
        console.log('QuestionEdit')
        console.log(id,'id')
    }

    function QuestionDelete(id,e) {
        console.log('QuestionDelete')
        console.log(id,'id')

        let data = questions.filter(item => item.id != id);
        setQuestions(data);
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
        <QuestionContext.Provider value={{ questions, QuestionEdit, QuestionDelete, QuestionView, QuestionGetId,QuestionGetTestId, NameElement }}>
            {children}
        </QuestionContext.Provider>
    );
}

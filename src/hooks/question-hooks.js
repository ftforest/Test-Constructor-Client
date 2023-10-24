import React, { createContext, useState, useContext } from "react";
import questionsData from '../data/questions.json';
import {
    storeAddElement,
    storeEditElements,
    storeGetElementsForParam,
    storeSetElementForParam, storeUpdateElementFields
} from "../functions/storege";
import {print} from "../functions/helpers";
import {useStates} from "../components/bootstrap/StateProvider";

const QuestionContext = createContext();
export const useQuestions = () => useContext(QuestionContext);

export default function QuestionProvider({ children }) {
    const [questions, setQuestions] = useState(questionsData);
    const {updateApp,setUpdateApp} = useStates();

    const refrashQuestions = (data) => {
        setQuestions(data);
    }

    const addQuestions = (quest,e) => {
        e.preventDefault();
        setQuestions([...questions, quest]);
        storeAddElement('questions',quest)
    }

    const editQuestion = (questionElement,refrashAnswers,e) => {
        e.preventDefault();
        let data;
        let els_answers = storeGetElementsForParam("answers","question_id",questionElement.id);
        if (els_answers.length > 0) {
            data = storeSetElementForParam('answers',"question_id",questionElement.id,"correct",false);
            print(data,"onChangTypeAnswer->data")
            data = storeGetElementsForParam('answers',"question_id",questionElement.id);
            print(data,"storeGetElementsForParam->data")
            if (data.length !== 0) data[0].correct = true;
            print(data,"data[0].correct")
            data = storeEditElements("answers",data);
            print(data,"onChangTypeAnswer->answers-2")
            //refrashAnswers(data);
            setUpdateApp(1)
        }
        data = storeUpdateElementFields('questions',questionElement)
        refrashQuestions(data);
    }

    return (
        <QuestionContext.Provider value={{ questions, editQuestion, addQuestions, refrashQuestions }}>
            {children}
        </QuestionContext.Provider>
    );
}

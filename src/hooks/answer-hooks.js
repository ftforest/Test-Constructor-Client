import React, { createContext, useState, useContext } from "react";
import answersData from '../data/answers.json';
import {
    storeAddElement,
    storeEditElements,
    storeGetElementsForParam,
    storeSetElementForParam, storeUpdateElementFields
} from "../functions/storege";
import {print} from "../functions/helpers";
import answers_bd from "../data/answers.json";

const AnswerContext = createContext();
export const useAnswers = () => useContext(AnswerContext);

export default function AnswerProvider({ children }) {
    const [answers, setAnswers] = useState(answersData);

    const refrashAnswers = (data) => {
        console.log(data,'refrashAnswers')
        setAnswers(data);
    }

    return (
        <AnswerContext.Provider value={{ answers, refrashAnswers }}>
            {children}
        </AnswerContext.Provider>
    );
}

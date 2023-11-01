import React, {createContext, useState, useContext, useEffect} from "react";
import userAnswersDataJson from '../data/my-userAnswers.json';
import {storeGetParam, storeSaveReWtite} from "../functions/storege";
import {getData} from "../functions/helpers";

const UserAnswerContext = createContext();
export const useUserAnswers = () => useContext(UserAnswerContext);

export default function UserAnswerProvider({ children, globalStore }) {
    const NameElement = 'userAnswers'
    
    let userAnswersData = []
    if (globalStore == 'state') {
        userAnswersData = userAnswersDataJson
    }
    if (globalStore == 'storeg') {
        userAnswersData = getData(NameElement,userAnswersDataJson) ? userAnswersDataJson : storeGetParam(NameElement)
    }
    let [userAnswers, setUserAnswers] = useState(userAnswersData);

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

    function UserAnswerSave(el,update = false) {
        

        if (update) {
            let data = userAnswers.filter(item => item.id != el.id)
            setUserAnswers([...data,el])
            storeSaveReWtite(NameElement,[...data,el])
        } else {
            setUserAnswers([...userAnswers,el])
            storeSaveReWtite(NameElement,[...userAnswers,el])
        }
    }

    function UserAnswerEdit(id,addId,e) {
        
        

        window.location.href = '/edit/' + NameElement + '/' + addId + '/' + id;
    }

    function UserAnswerDelete(id,e) {
        
        

        let data = userAnswers.filter(item => item.id != id);
        setUserAnswers(data);
        storeSaveReWtite(NameElement,data)
    }

    function UserAnswerView(id,e) {
        
        

        window.location.href = '/userAnswer/view/'+id;
    }

    function UserAnswerGetId(id) {
        let oneUserAnswer = userAnswers.filter(item => item.id == id)[0]
        return oneUserAnswer
    }

    return (
        <UserAnswerContext.Provider value={{ NameElement, userAnswers, UserAnswerEdit, UserAnswerDelete, UserAnswerView, UserAnswerGetId, structure, UserAnswerSave }}>
            {children}
        </UserAnswerContext.Provider>
    );
}

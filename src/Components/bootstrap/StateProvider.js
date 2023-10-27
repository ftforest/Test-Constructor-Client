import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {
    storeAddElement,
    storeDeleteElementsForParam,
    storeEditElement,
    storeEditElements,
    storeGetElementsForParam,
    storeGetParam,
    storeSaveReWtite,
    storeSetElementForParam,
    storeUpdateElementFields,
} from '../../functions/storege';
import { print } from '../../functions/helpers';
import stateApp from './../../data/state-app.json';
import questions_bd from './../../data/questions.json';
import answers_bd from './../../data/answers.json';
import tests_bd from './../../data/my-tests.json';
import users_bd from './../../data/users.json';
import compliter_tests_bd from './../../data/completed_test.json';

const StateContext = createContext();
export const useStates = () => useContext(StateContext);

export function StateProvider({ children }) {
    ////
    const baseURL = 'http://localhost:3001'; // Замените на ваш базовый URL

    const [questions, setQuestions] = useState(questions_bd);
    const [answers, setAnswers] = useState(answers_bd);
    const [tests, setTests] = useState(tests_bd);
    const [users, setUsers] = useState(users_bd);
    const [completedTests, setCompletedTests] = useState(compliter_tests_bd);

    const [states, setStates] = useState(stateApp);
    const [storeOrDb, setStoreOrDb] = useState(true);
    const [newQuestion, setNewQuestion] = useState([{
        "id": 1,
        "text": "What is your name",
        "answear": "one_ans"
    }]);

    const refrashQuestions = (data) => {
        setQuestions(data);
    }
    const refrashAnswers = (data) => {
        setAnswers(data);
    }
    const refrashUsers = (data) => {
        setUsers(data);
    }
    const addQuestions = (quest,e) => {
        e.preventDefault();
        setQuestions([...questions, quest]);
        storeAddElement('questions',quest)
    }
    const updateTests = (data) => {
        setTests(data);
    }
    const onChangeAnswerRight = (answer,question,e) => {
        if (question.type == "one_ans") {
            let data = storeSetElementForParam('answers',"question_id",question.id,"correct",false);
            print(data,'onChangeAnswerRight');
            answer.correct = true;
            data = storeEditElement("answers",answer);
            setAnswers(data);
        } else if (question.type == "many_ans") {
            answer.correct = !answer.correct;
            let data = storeEditElement('answers',answer);
            console.log(data)
            setAnswers(data);
        }
    }
    const editQuestion = (questionElement,e) => {
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
            refrashAnswers(data);
        }
        data = storeUpdateElementFields('questions',questionElement)
        refrashQuestions(data);
    }
    const addAnswers = (answer,e) => {
        let data = storeSetElementForParam('answers',"question_id",answer.question_id,"correct",false);
        print(data,'StateProvider->addAnswers');
        data = storeAddElement("answers",answer);
        setAnswers(data);
    }


    const addTest = (test,e) => {
        e.preventDefault();
        let tests_store = storeGetParam('tests');
        let edit_t = tests_store.filter(item => item.id == test.id)[0];
        let edit_t_old = tests_store.filter(item => item.id != test.id);
        let item = edit_t;
        if (edit_t != undefined) {
            if (edit_t.title != test.title) item = {
                "id": test.id,
                "title": test.title,
                "author_id": test.author_id,
                "created_at": test.created_at
            }
        }else{
            let test_ident = 0;
            tests_store.map((item) => {
                if (item.id >= test_ident) test_ident = parseInt(item.id) + 1;
            });
            item = {
                "id": test_ident,
                "title": test.title,
                "author_id": test.author_id,
                "created_at": test.created_at
            }
        }
        setTests([...edit_t_old,item]);
        storeSaveReWtite('tests',[...edit_t_old,item]);
    }
    const getAllTests = () => {
        return JSON.parse(window.localStorage.getItem('tests'));
    }
    const getTest = (test_id,e) => {
        e.preventDefault();
        return tests.filter((item) => item.id == test_id)
    }
    const saveTextAnswers = (question_id, answer_text, e) => {
        e.preventDefault();
        let data;
        data = storeDeleteElementsForParam("answers","question_id",question_id);
        let new_el = {
            "value": answer_text,
            "correct": true,
            "question_id": question_id
        };
        data = storeAddElement("answers",new_el);
        refrashAnswers(data)
    }
    const goLoginForm = (e) => {
        e.preventDefault();
        setStates({...states, ["login"]: true});
    }
    const goRgistrationForm = (e) => {
        e.preventDefault();
        //
        setStates({...states, ["login"]: false});
    }
    const RegistrUser = (e,login,password) => {
        e.preventDefault();
        let user = storeGetElementsForParam("users","email",login);
        if (user.length != 0) {
            user = user[0];
            //storeAddElement("users",user)
            //setStates({...states, ["login"]: true});
        }else {
            const user_item = {
                "email": login,
                "password": password
            }
            console.log(user_item,"user_item");
            storeAddElement("users",user_item);
        }
        setStates({...states, ["login"]: true});
    }

    const handleLogin = async (e,login,password,users_reg,localValue) => {
        e.preventDefault();
        console.log(login,password,users_reg);
        try {
            console.log(`${baseURL}/auth/login`);
            // /auth/login, POST
            const response = await axios.post(`${baseURL}/auth/login`, {
                "email": "ftforest640@gmail.com",
                "password": "123456"
            });

            const token = response.data.token;
            // Сохраните токен в localStorage или состоянии приложения
            localStorage.setItem('token', token);
            console.log(token,"token")
            localStorage.setItem('getDataTable',localValue.toString());
            localStorage.setItem('access',true);
            setStates({...states, ["access"]: true});
            window.location.href = '/my-tests';

            // Выполните перенаправление на защищенную страницу или выполните другие необходимые действия
        } catch (error) {
            console.error(error);
        }
    };
    const LoginApp = (e,login,password,users_reg,localValue) => {
        e.preventDefault();
        console.log(login,password,users_reg);
        let users_login = storeSaveReWtite('users',users_reg);
        //
        let user = storeGetElementsForParam("users","email",login);
        print(user,"user")
        if (user.length != 0) {
            user = user[0];
            if (user.password == password) {
                localStorage.setItem('access',true);
                localStorage.setItem('getDataTable',localValue.toString());
                setStates({...states, ["access"]: true});
                storeSaveReWtite('user_current',user);
                storeSaveReWtite('tests',tests);
                storeSaveReWtite('completed_tests',completedTests);
                storeSaveReWtite('questions',questions);
                storeSaveReWtite('answers',answers);
                window.location.href = '/tests';
            }
        }
    }
    const LogoutApp = (e) => {
        e.preventDefault();
        //setStates({...states, ["access"]: false});
        localStorage.clear();
        window.location.href = '/';
    }
    const AddQuestion = (e,new_question) => {
        e.preventDefault();
        setNewQuestion([...newQuestion, new_question]);
    }

    return (
        <StateContext.Provider
            value={{
                states,
                goLoginForm,
                goRgistrationForm,
                LoginApp,
                LogoutApp,
                RegistrUser,
                newQuestion,
                setNewQuestion,
                AddQuestion,
                questions,
                addQuestions,
                editQuestion,
                answers,
                addAnswers,
                saveTextAnswers,
                tests,
                addTest,
                getTest,
                getAllTests,
                onChangeAnswerRight,
                refrashQuestions,
                updateTests,
                refrashAnswers,
                users,
                refrashUsers,
                handleLogin,
                baseURL,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

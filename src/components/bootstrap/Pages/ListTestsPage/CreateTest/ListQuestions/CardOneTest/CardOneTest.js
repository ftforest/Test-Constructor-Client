import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useStates} from "../../../../../StateProvider";
import SelectTypeAnswer from "../../../../../PagesMyTest/SelectTypeAnswer";
import {
    storeDeleteElement,
    storeDeleteElementsForParam, storeGetElementsForParam,
    storeGetParam,
    storeSaveReWtite
} from "../../../../../../../functions/storege";
import RadioButtonsAnimalsAdaptive from "../../../../../../examples/RadioButtonsAnimalsAdaptive";
import {FaAlignCenter, FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {useQuestions} from "../../../../../../../hooks/question-hooks";
import {useAnswers} from "../../../../../../../hooks/answer-hooks";

function CardOneTest(props) {
    let list_answers = '';
    const question = props.question;
    const answers = props.answers;
    const idx_card = props.idx;
    const test_id = props.test_id;
    const handleDragStart = props.handleDragStart;
    const handleDragOver = props.handleDragOver;
    const handleDrop = props.handleDrop;
    const btnName = "Add answear";
    const btnName2 = "Save answear";
    let textInput = React.createRef();
    let answerText = React.createRef();
    let [editTitle,setEditTitle] = useState(false);
    //let [isCheckeds, setIsCheckeds] = useState(answers);
    list_answers = listAnswers(question);
    /*useEffect(() => {
        
        list_answers = listAnswers(question);
    },[isCheckeds]);*/
    const {addAnswers,saveTextAnswers, onChangeAnswerRight} = useStates();
    const {refrashQuestions} = useQuestions();
    const {refrashAnswers} = useAnswers();

    //
    function handleOnChangeCheckBox(answer,question,event) {
        //event.target.checked = !event.target.checked;
        //event.preventDefault();
        //console.log('handleOnChangeCheckBox',answer)
        //
        //
        //setIsCheckeds(!isCheckeds[answer.id].correct);

        onChangeAnswerRight(answer,question,event);
    }
    function DeleteAnswer(id,e) {
        let data = storeDeleteElementsForParam('answers','id',id);
        refrashAnswers(data);
    }
    function listAnswers(question) {
        let type_answer = 'radio';
        let list_answers = '';
        if (question.type == "one_ans") type_answer = 'radio';
        if (question.type == "many_ans") type_answer = 'checkbox';
        if (question.type == "text_ans") type_answer = 'text';
        if (type_answer == 'radio' || type_answer == 'checkbox') {
            return list_answers = answers.map((answer, idx) => {
                return (
                    <li key={idx} className="card-one-test_list-answers">
                        <Form.Check
                            checked={answer.correct}
                            //defaultChecked={answer.correct}
                            inline
                            label={(idx + 1) + "." + answer.value}
                            name={`group${answer.question_id}`}
                            type={type_answer}
                            id={`inline-${type_answer}-${answer.question_id}-${idx}`}
                            onChange={(e) => handleOnChangeCheckBox(answer,question, e)}
                        />
                        <Button variant="outline-secondary" className="mb-2" size="sm" onClick={(e)=>DeleteAnswer(answer.id,e)}>X</Button>
                        {/*<Button
                            draggable="true"
                            onDrop={e => handleDrop(e, question)}
                            onDragOver={e => handleDragOver(e)}
                            onDragStart={e => handleDragStart(e, question)}
                        />*/}
                    </li>
                );
            });
        } else {
            let textAnswer = "";
            const array = answers.filter((item) => question.id == item.question_id);
            if (typeof array !== 'undefined' && array.length > 0) {
                //
                textAnswer = array[0].value;
            } else {
                textAnswer = "";
            }

            return list_answers = (
                <li className="card-one-test_list-answers">
                    <div>{textAnswer}</div>
                </li>
            );
        }
    }

    function handleClick(id,e) {
        const answer = {
            "id": 0,
            "question_id": id,
            "value": textInput.current.value,
            "correct": true
        };
        addAnswers(answer,e);
    }
    function handleClick2(question_id, answer_text,e) {
        saveTextAnswers(question_id, answer_text, e);
    }
    const button = (question) => {
        if (question.type != "text_ans") {
            return (
                <button onClick={(e) => handleClick(question.id, e)}>{btnName}</button>
            );
        } else {
            return (
                <button onClick={(e) => handleClick2(question.id, textInput.current.value, e)}>{btnName2}</button>
            );
        }
    }

    function deletQuestion(question,e) {

        const questions_data = {
            "id": question.id,
            "description": question.description,
            "test_id": test_id,
            "type": question.type,
            "order": 2
        };
        //
        let data = storeDeleteElement("questions", questions_data);
        storeDeleteElementsForParam("answers","question_id",question.id);
        refrashQuestions(data)
    }

    function editTitleQuestions(e) {
        e.preventDefault();
        editTitle = true;
        setEditTitle(editTitle);
    }

    let input_title = '';
    if (editTitle) {
        input_title = () => {
            return (
                <input
                    className="card-one-test_title-question"
                    defaultValue={question.description + "?"}
                />
            );
        }
    } else {
        input_title = () => {
            return (

                <span
                    className="card-one-test_title-question"
                >
                    {question.description + "?"}
                </span>
            );
        }
    }


    return (
        <div className="card-one-test">
            <div className="card-one-test_title-block"
                 draggable="true"
                 onDrop={e => handleDrop(e, idx_card, question)}
                 onDragOver={e => handleDragOver(e)}
                 onDragStart={e => handleDragStart(e, idx_card, question)}
            >
                <span className="card-one-test_num">{(idx_card+1)+". "}</span>
                {input_title()}
                <div className="card-one-test_action">
                    <FaTrashAlt className="card-one-test_close-icon" onClick={(e) => deletQuestion(question,e)}/>
                    <FaUserEdit className="card-one-test_edit-icon" onClick={(e)=> editTitleQuestions(e)}/>
                </div>
            </div>

            <SelectTypeAnswer test_id={test_id} question={question}/>
            <ul className="card-one-test_list-answers-ul">
                {list_answers}
            </ul>
            {/*<RadioButtonsAnimalsAdaptive answers={answers} question={question}/>*/}
            <div className="card-one-test_answer-add">
                <input
                    type="text"
                    ref={textInput}
                    placeholder="Enter answer"/>
                {button(question)}
            </div>
        </div>
    );
}

export default CardOneTest;
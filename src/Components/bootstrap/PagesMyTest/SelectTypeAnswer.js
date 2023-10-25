import React from 'react';
import {Form} from "react-bootstrap";
import {useStates} from "../StateProvider";
import {
    storeEditElement, storeEditElements, storeGetElementsForParam,
    storeGetObjectById,
    storeGetParam,
    storeSaveReWtite,
    storeSetElementForParam
} from "../../../functions/storege";
import {print} from "../../../functions/helpers";

function SelectTypeAnswer(props) {
    const question = props.question;
    const question_id = question.id;
    const question_type = question.type;
    const test_id = question.test_id;
    let textInput = React.createRef();
    const {editQuestion,addAnswers} = useStates();
    function onChangTypeAnswer(question_id,e) {
        //
        let question = storeGetObjectById("questions",question_id);
        //const questions = storeGetParam('questions')
        //const quest = questions.filter((item) => item.id == id)[0];
        //
        const questionElement = {
            "id": question.id,
            "type": textInput.current.value
        };
        //
        //

        editQuestion(questionElement,e);
    }
    return (
        <>
            <Form.Select ref={textInput}  aria-label="Type Answer" value={question_type} onChange={(e) => onChangTypeAnswer(question_id, e)}>
                <option value="one_ans">One Answer</option>
                <option value="many_ans">Many Answer</option>
                <option value="text_ans">Text Answer</option>
            </Form.Select>
        </>
    );
}

export default SelectTypeAnswer;
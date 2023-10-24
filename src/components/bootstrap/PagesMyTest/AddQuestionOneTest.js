import React from 'react';
import {Form} from "react-bootstrap";
import {useStates} from "./../StateProvider";
import SelectTypeAnswer from "./SelectTypeAnswer";
import {useQuestions} from "../../../hooks/question-hooks";

function AddQuestionOneTest(props) {
    const btnName = "Add questions";
    const test_id = props.test_id;
    const {addTest} = useStates();
    const {questions,addQuestions} = useQuestions();
    let questionText = React.createRef();

    function handleClick(test_id,e) {
        //

        var id_question = 0;
        questions.map((item) => {
            if (item.id > id_question) id_question = item.id;
        });
        id_question++;
        const questions_data = {
            "id": id_question,
            "description": questionText.current.value,
            "test_id": test_id,
            "type": "one_ans",
            "order": 2
        };
        //
        addQuestions(questions_data,e);
    }

    const button = (test_id) => {
        return (
            <button onClick={(e) => handleClick(test_id, e)}>{btnName}</button>
        );
    }
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label></Form.Label>
                <Form.Control ref={questionText}  type="text" placeholder="Введите новый вопрос"/>
                <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {button(test_id)}
        </>
    );
}



export default AddQuestionOneTest;
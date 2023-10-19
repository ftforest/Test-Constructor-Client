import React from 'react';
import {Form, ListGroup} from "react-bootstrap";
import {useStates} from "../StateProvider";
import Button from "react-bootstrap/Button";

function FormAddAnswers(props) {
    const {newQuestion} = useStates();
    return (
        <>
            <NumberList questions={newQuestion}/>

            <Button variant="outline-secondary">+</Button>{' '}
        </>
    );
}

function NumberList(props) {
    const questions = props.questions;
    const listItems = questions.map((question,idx) =>
        <li key={idx}>id-<b>{question.id}</b>,text-<b>{question.text}</b>,answer-<b>{question.answear}</b></li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

export default FormAddAnswers;
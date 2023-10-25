import React from 'react';
import {Col, Container, Row, Form} from "react-bootstrap";

function FormAddTextAnswers(props) {
    const answer = JSON.parse('[{"id":1,"id_quest":2,"text_answer":"Ответ 1","type":"radio"},{"id":2,"id_quest":2,"text_answer":"Ответ 2","type":"radio"}]');
    return (
        <>

                <div className="mb-3">
                    <NumberList answers={answer}/>
                </div>

        </>
    );
}

function NumberList(props) {
    const answers = props.answers;
    const listItems = answers.map((answer,idx) =>
        <Form.Check
            inline
            label={idx}
            name={`group${answer.id_quest}`}
            type={answer.type}
            id={`inline-${answer.type}-${idx}`}
        />
    );
    return (
        <ul>{listItems}</ul>
    );
}

export default FormAddTextAnswers;
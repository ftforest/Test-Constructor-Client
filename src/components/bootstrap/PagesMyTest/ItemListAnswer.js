import React from 'react';
import {Form} from "react-bootstrap";

function ItemListAnswer(props) {
    const idx = props.idx;
    const answer = props.answer;
    const type_answer = props.type;
    return (
        <li>
            <Form.Check
                //checked={answer.correct}
                inline
                label={(idx + 1) + "." + answer.value}
                name={`group${answer.question_id}`}
                type={type_answer}
                id={`inline-${type_answer}-${answer.question_id}-${idx}`}
            />
        </li>
    );
}

export default ItemListAnswer;
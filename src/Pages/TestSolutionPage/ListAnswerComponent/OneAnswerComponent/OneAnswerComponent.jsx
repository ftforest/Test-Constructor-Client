import React from 'react';
import Form from "react-bootstrap/Form";

function OneAnswerComponent(props) {
    let answer = props.answer
    let question = props.question
    let type

    if (question.type == 'one_ans') {
        type = 'radio'
        return (
            <>
                <input type={type} id={'answer-id-'+answer.id} name={'answer-radio-' + question.id} defaultValue={answer.id} />
                <label htmlFor={'answer-id-'+answer.id}>{answer.value}</label><br/>
            </>
        )
    }
    if (question.type == 'many_ans') {
        type = 'checkbox'
        return (
            <>
                <input type={type} id={'answer-id-'+answer.id} name={'answer-checkbox-' + question.id + '-' + answer.id} defaultValue={answer.id} />
                <label htmlFor={'answer-id-'+answer.id}>{answer.value}</label><br/>
            </>
        )
    }
    if (question.type == 'text_ans') {
        type = 'text'
        return (
            <>
                <input type={type} id={'answer-id-'+answer.id} name={'answer-input-' + answer.id} defaultValue={''} />
            </>
        )
    }
    return (
        <div>{answer.value}</div>
    );
}

export default OneAnswerComponent;
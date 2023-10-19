import React from 'react';
import Form from 'react-bootstrap/Form';

function FormTypeAnswer(props) {


    return (
        <Form.Select aria-label="Type Answer" value={props.value} onChange={props.onChange}>
            <option>Variant Answer</option>
            <option value="one_ans">One Answer</option>
            <option value="many_ans">Many Answer</option>
            <option value="text_ans">Text Answer</option>
        </Form.Select>
    );
}

export default FormTypeAnswer;
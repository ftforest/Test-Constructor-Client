import React from 'react';
import Form from 'react-bootstrap/Form';

function FormTextInput(props) {
    return (
        <>
            <Form.Label htmlFor="inputPassword5">Questoion</Form.Label>
            <Form.Control
                type="text"
                id="inputQuestion5"
                aria-describedby="questionHelpBlock"
                value={props.value}
                onChange={props.onChange}
            />
            <Form.Text id="questionHelpBlock" muted>
                Your question
            </Form.Text>
        </>
    );
}

export default FormTextInput;
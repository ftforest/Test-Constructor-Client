import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Col, Container, Row} from "react-bootstrap";
import FormAddAnswers from "./CreateTestComponents/FormAddAnswers";
import {useStates} from "./StateProvider";


function CreateTest(props) {

    const {AddQuestion} = useStates();

    return (
        <Container>
            <Row>
                <Col>
                    <Calculator funcAddQuewestion={AddQuestion}/>
                    {/*<FormTypeAnswer/>*/}
                    <FormAddAnswers/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>zzzzzzzzzzzzzzzz
                        <Button variant="outline-danger">Cancel</Button>{' '}
                        <Button variant="outline-success">Save</Button>{' '}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateTest;
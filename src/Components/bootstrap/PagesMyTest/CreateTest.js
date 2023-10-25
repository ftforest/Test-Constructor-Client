import React from 'react';
import {useStates} from "./../StateProvider";
import ListQuestions from "./ListQuestions";
import {Col, Container, Row} from "react-bootstrap";
import { useParams } from 'react-router';
import {storeGetParam} from "../../../functions/storege";
import Reservation from "../../examples/Checkboxes";
import TodoList from "../../examples/TodoList";

function CreateTest(props) {
    const { addQuestions, addAnswers} = useStates();
    const questions = storeGetParam('questions');
    const answers = storeGetParam('answers');
    //
    let { id } = useParams();
    if (id == null) id = 0;
    //

    return (
        <Container>
            <Row>
                <Col>
                    <div className="create-test-wrap">
                        <ListQuestions test_id={id} questions={questions} answers={answers}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateTest;
import React from 'react';
import {useStates} from "../../../StateProvider";
import ListQuestions from "./ListQuestions/ListQuestions";
import {Col, Container, Row} from "react-bootstrap";
import { useParams } from 'react-router';
import {storeGetParam} from "../../../../../functions/storege";
import Reservation from "../../../../examples/Checkboxes";
import TodoList from "../../../../examples/TodoList";
import AnswerProvider from "../../../../../hooks/answer-hooks";
import QuestionProvider from "../../../../../hooks/question-hooks";

function CreateTest(props) {
    const { addQuestions, addAnswers} = useStates();
    const questions = storeGetParam('questions');
    const answers = storeGetParam('answers');

    //
    let { id } = useParams();
    if (id == null) id = 0;
    //

    return (
        <AnswerProvider>
        <QuestionProvider>

        <Container>
            <Row>
                <Col>
                    <div className="create-test-wrap">
                        <ListQuestions test_id={id} questions={questions} answers={answers}/>
                    </div>
                </Col>
            </Row>
        </Container>

        </QuestionProvider>
        </AnswerProvider>
    );
}

export default CreateTest;
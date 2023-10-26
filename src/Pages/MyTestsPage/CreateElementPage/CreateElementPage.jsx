import React from 'react';
import {useParams} from "react-router";
import {useTests} from "../../../hooks/test-hook";
import {useQuestions} from "../../../hooks/question-hook";
import {useAnswers} from "../../../hooks/answer-hook";
import {Col, Container, Form, Row,Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ViewObject} from "../../../functions/helpers";

function CreateElementPage(props) {
    const { name } = useParams();
    console.log(name,'name ')
    const nameEl = name || 'empty name'
    const navigate = useNavigate();

    let listDebugEl = []
    let {structure:test,TestSave,tests:listTest} = useTests()
    let {structure:question,QuestionSave,questions:listQuestion} = useQuestions()
    let {structure:answer,AnswerSave,answers:listAnswer} = useAnswers()

    let dataObj = props.dataObj || {
        "id": "example",
        "title": "example"
    }
    if (nameEl == 'test') {
        dataObj = test
        listDebugEl = listTest
    }
    if (nameEl == 'question') {
        dataObj = question
        listDebugEl = listQuestion
    }
    if (nameEl == 'answer') {
        dataObj = answer
        listDebugEl = listAnswer
    }

    const Save = (event) =>  {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        console.log(formData,'formData')
        const  formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj,'formDataObj')
        if (nameEl == 'test') TestSave(formDataObj)
        if (nameEl == 'question') QuestionSave(formDataObj)
        if (nameEl == 'answer') AnswerSave(formDataObj)
    }



    let form = []
    Object.keys(dataObj).forEach((key,idx) =>
        form.push(
            <Form.Group key={idx} className="mb-3" controlId="formBasicEmail">
                <Form.Label>{key}</Form.Label>
                <Form.Control type="text" placeholder={key} name={key}  defaultValue={dataObj[key]} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
        ))

    return (
        <Container>
            <Row>
                <Col>
                    <div>{listDebugEl.map((r,i) => ViewObject(r,'Debug:',i))}</div>
                    {nameEl}
                    <br/>
                    <Form onSubmit={Save}>
                        {form}
                        <Button variant="primary" type="submit" size="lg" active>
                            Save {nameEl}
                        </Button>{' '}
                        <Button onClick={() => navigate(-1)} variant="secondary" size="lg" active>
                            Back
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateElementPage
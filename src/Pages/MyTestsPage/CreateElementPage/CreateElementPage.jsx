import React from 'react';
import {useParams} from "react-router";
import {useTests} from "../../../hooks/test-hook";
import {useQuestions} from "../../../hooks/question-hook";
import {useAnswers} from "../../../hooks/answer-hook";
import {Col, Container, Form, Row,Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ViewObject} from "../../../functions/helpers";

function CreateElementPage(props) {
    const { name,additionalId } = useParams();
    console.log(name,'name ')
    console.log(additionalId,'additionalId ')
    const addId = additionalId || 0
    const nameEl = name || 'empty name'
    const navigate = useNavigate();
    let structure = {}

    let listDebugEl = []
    let {structure:test,TestSave,tests:listTest} = useTests()
    let {structure:question,QuestionSave,questions:listQuestion} = useQuestions()
    let {structure:answer,AnswerSave,answers:listAnswer} = useAnswers()

    let additionalData = props.additionalData

    let dataObj = props.dataObj || {
        "id": "example",
        "title": "example"
    }
    if (nameEl == 'tests') {
        dataObj = test
        listDebugEl = listTest
        structure = test
    }
    if (nameEl == 'questions') {
        dataObj = question
        listDebugEl = listQuestion
        structure = question
    }
    if (nameEl == 'answers') {
        dataObj = answer
        listDebugEl = listAnswer
        structure = answer
    }

    const Save = (event) =>  {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        console.log(formData,'formData')
        const  formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj,'formDataObj')
        if (nameEl == 'tests') TestSave(formDataObj)
        if (nameEl == 'questions') QuestionSave(formDataObj)
        if (nameEl == 'answers') AnswerSave(formDataObj)
    }



    let form = []
    Object.keys(dataObj).forEach((key,idx) =>
        form.push(
            <Form.Group key={idx} className="mb-3" controlId="formBasicEmail">
                <Form.Label>{key}</Form.Label>
                <Form.Control type="text" placeholder={key} name={key} readOnly={'addId' == structure[key] ?? true}  defaultValue={key.match(/_id/) ? addId : dataObj[key]} />
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
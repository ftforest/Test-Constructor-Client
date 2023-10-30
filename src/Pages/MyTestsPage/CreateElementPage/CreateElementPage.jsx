import React from 'react';
import {useParams} from "react-router";
import {useTests} from "../../../hooks/test-hook";
import {useQuestions} from "../../../hooks/question-hook";
import {useAnswers} from "../../../hooks/answer-hook";
import {Col, Container, Form, Row,Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {structureGetValue, ViewObject} from "../../../functions/helpers";
import FormElementsComponent from "../../../Components/FormElementsComponent/FormElementsComponent";

function CreateElementPage(props) {
    const { name,additionalId, id } = useParams();
    console.log(name,'name ')
    console.log(additionalId,'additionalId ')
    console.log(id,'id ')

    const addId = additionalId || 0
    const nameEl = name || 'empty name'
    const navigate = useNavigate();
    let structure = {}

    let listDebugEl = []
    let {structure:test,TestSave,tests:listTest,TestGetId} = useTests()
    let {structure:question,QuestionSave,questions:listQuestion,QuestionGetId} = useQuestions()
    let {structure:answer,AnswerSave,answers:listAnswer,AnswerGetId} = useAnswers()

    let additionalData = props.additionalData

    let dataObj = props.dataObj || {
        "id": {
            'value':'example',
            'type':'text',
        },
        "title": {
            'value':'example',
            'type':'text',
        }
    }
    if (nameEl == 'tests') {
        if (id != undefined) dataObj = TestGetId(id)
        else dataObj = structureGetValue(test)
        listDebugEl = listTest
        structure = test

    }
    if (nameEl == 'questions') {
        if (id != undefined) dataObj = QuestionGetId(id)
        else dataObj = structureGetValue(question)
        listDebugEl = listQuestion
        structure = question
    }
    if (nameEl == 'answers') {
        if (id != undefined) dataObj = AnswerGetId(id)
        else dataObj = structureGetValue(answer)
        listDebugEl = listAnswer
        structure = answer
    }

    const Save = (event) =>  {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        console.log(formData,'formData')
        const  formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj,'formDataObj')

        if (id == undefined) {
            if (nameEl == 'tests') TestSave(formDataObj)
            if (nameEl == 'questions') QuestionSave(formDataObj)
            if (nameEl == 'answers') AnswerSave(formDataObj)
        } else {
            if (nameEl == 'tests') TestSave(formDataObj,true)
            if (nameEl == 'questions') QuestionSave(formDataObj,true)
            if (nameEl == 'answers') AnswerSave(formDataObj,true)
        }
    }



    /*let form = []
    Object.keys(structure).forEach((key,idx) =>
        form.push(
            <Form.Group key={idx} className="mb-3" controlId="formBasicEmail">
                <Form.Label>{key}</Form.Label>
                <Form.Control type={structure[key].type} placeholder={key} name={key} readOnly={(id != undefined && key == 'id' ) || 'addId' == structure[key].value ? true : false}  defaultValue={key.match(/_id/) ? addId : dataObj[key]} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
        ))*/

    return (
        <Container>
            <Row>
                <Col>
                    <div>{listDebugEl.map((r,i) => ViewObject(r,'Debug:',i))}</div>
                    {nameEl}
                    <br/>
                    <Form onSubmit={Save}>
                        <FormElementsComponent id={id} addId={addId} structure={structure} dataObj={dataObj} />
                        <Button variant="primary" type="submit" size="lg" active>
                            {id == undefined ? 'Save' : 'Update'} {nameEl}
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
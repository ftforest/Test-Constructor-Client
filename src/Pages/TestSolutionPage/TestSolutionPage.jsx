import React from 'react';
import {useParams} from "react-router";
import {useTests} from "../../hooks/test-hook";
import {useQuestions} from "../../hooks/question-hook";
import {useAnswers} from "../../hooks/answer-hook";
import ListAnswerComponent from "./ListAnswerComponent/ListAnswerComponent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TestSolutionPage(props) {
    
    const { id } = useParams()
    

    const { TestGetId } = useTests()
    const { QuestionGetTestId } = useQuestions()
    const { AnswerGetId,AnswerGetQuestionId } = useAnswers()

    let testInfo = TestGetId(id)
    let testQuestionList = QuestionGetTestId(testInfo.id)
    let testAnswerQuestionList = []

    testQuestionList.map((question,idx) => {
        let item = AnswerGetQuestionId(question.id)
        testAnswerQuestionList.push([question.id,item])
    })

    function countRigthAnswers(ids,values) {

        console.log('ids',ids)
        console.log('values',values)
        let rigthAnswersTest = 0
        let wrongAnswersTest = 0
        let countRigthAnswers = 0
        let countWrongAnswers = 0
        let countAnswers = 0
        let countQuestions = 0


        testQuestionList.map((question,idx) => {

            countQuestions++

            let answersQuestion = AnswerGetQuestionId(question.id)
            

            let indexAnswer = 0
            let rigthAnswer = 0
            let wrongAnswer = 0
            let rigthAnswerAllInQuestion = 0
            let wrongAnswerAllInQuestion = 0

            answersQuestion.forEach((answer)=>{

                indexAnswer++
                countAnswers++


                if (answer.correct) rigthAnswerAllInQuestion++
                else wrongAnswerAllInQuestion++

                if(ids.includes(answer.id.toString()) && answer.correct) {
                    if (answersQuestion.length != 1) rigthAnswer++
                    else if (answersQuestion.length == 1 && answer.value == values[ids.indexOf(answer.id.toString())]){
                        rigthAnswer++
                    } else wrongAnswer++
                }else if (ids.includes(answer.id.toString()) && !answer.correct) {
                    wrongAnswer++
                }

                if (answersQuestion.length == indexAnswer && rigthAnswer != 0 && rigthAnswer == rigthAnswerAllInQuestion) {
                    if(wrongAnswer == 0) {
                        rigthAnswersTest++
                        countRigthAnswers += rigthAnswer
                    } else {
                        wrongAnswersTest++
                        countWrongAnswers += wrongAnswer
                    }
                }
                if (answersQuestion.length == indexAnswer && rigthAnswer == 0) {
                    wrongAnswersTest++
                    countWrongAnswers += wrongAnswer
                }
            })
        })

        console.log('countRigthAnswers',countRigthAnswers)
        console.log('countWrongAnswers',countWrongAnswers)
        console.log('rigthAnswersTest',rigthAnswersTest)
        console.log('wrongAnswersTest',wrongAnswersTest)
        printResult(rigthAnswersTest,wrongAnswersTest,countRigthAnswers,countWrongAnswers,countAnswers,countQuestions)

    }

    function printResult(rigthAnswersTest,wrongAnswersTest,countRigthAnswers,countWrongAnswers,countAnswers,countQuestions) {
        console.log('allRigthAnswers: '+countRigthAnswers+'/' + countAnswers)
        console.log('allWrongAnswers: '+countWrongAnswers+'/' + countAnswers)
        console.log('rigthAnswersTest: '+rigthAnswersTest+'/' + countQuestions)
        console.log('wrongAnswersTest: '+wrongAnswersTest+'/' + countQuestions)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        
        const  formDataObj = Object.fromEntries(formData.entries())
        
        let answer_ids = []
        let answer_vals = []
        let answer_group = []
        Object.keys(formDataObj).map((key,idx) => {
            if (key.match(/answer-radio-/)) {
                answer_vals.push(formDataObj[key])
                answer_ids.push(formDataObj[key]) //key.substring(13)

            }
            if (key.match(/answer-checkbox-/)) {
                answer_vals.push(formDataObj[key])
                answer_ids.push(key.substring(18)) //key.substring(18)
            }
            if (key.match(/answer-input-/)) {
                answer_vals.push(formDataObj[key])
                answer_ids.push(key.substring(13))
            }
        })
        
        
        

        countRigthAnswers(answer_ids,answer_vals)
        saveUserAnswers(answer_ids,answer_vals)
    }

    function GetTestQuestionsAndAnswers(testInfo,QuestionGetTestId,AnswerGetQuestionId,CallBackFn) {
        let questions = QuestionGetTestId(testInfo.id)
        questions.map(question => {
            let answers = AnswerGetQuestionId(question.id)
            answers.map(answer => {
                CallBackFn(testInfo,question,answer)
            })
        })
    }

    function saveUserAnswers (answer_ids,answer_vals) {
        let questions = []
        let answers = []
        GetTestQuestionsAndAnswers(testInfo,QuestionGetTestId,AnswerGetQuestionId,(testInfo,question,answer)=> {
            console.log('testInfo',testInfo)
            console.log('question',question)
            console.log('answer',answer)
            let questionExist = questions.find(o => o.id !== question.id)
            if (questionExist == undefined) questions.push(question)
            answers.push(answer)
        })
        answer_ids.map((id,idx) => {
            let answerUser = answers.find(o => o.id === id)
                if (answerUser != undefined) {

                }
            })
        console.log('questions',questions)
        console.log('answers',answers)
    }


    
    
    return (
        <div>{testInfo.title}
            <Form onSubmit={handleFormSubmit}>
            {testQuestionList.map((question,idx,arr) =>
                { let answerOneQuestion = []; testAnswerQuestionList.map(answers => question.id == answers[0] ? answerOneQuestion.push(answers[1].map((answer) => question.id == answer.question_id ? answer : '')) : '')
                    
                    return (
                        <div key={idx}>
                            <div>Question({question.id}): {question.description}</div>
                            <ListAnswerComponent answer={answerOneQuestion[0]} question={question}/>
                        </div>
                    )
                }
            )}
                <Button variant="primary" type={"submit"}>Answer</Button>{' '}
            </Form>
        </div>
    );
}

export default TestSolutionPage;
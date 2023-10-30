import React from 'react';
import {useParams} from "react-router";
import {useTests} from "../../hooks/test-hook";
import {useQuestions} from "../../hooks/question-hook";
import {useAnswers} from "../../hooks/answer-hook";

function TestSolutionPage(props) {
    console.log('TestSolutionPage')
    const { id } = useParams()
    console.log(id,'id ')

    const { TestGetId } = useTests()
    const { QuestionGetTestId } = useQuestions()
    const { AnswerGetQuestionId } = useAnswers()

    let testInfo = TestGetId(id)
    let testQuestionList = QuestionGetTestId(testInfo.id)
    let testAnswerQuestionList = []

    testQuestionList.map((question,idx) => {
        let item = AnswerGetQuestionId(question.id)
        testAnswerQuestionList.push([question.id,item])
    })

    console.log(testQuestionList,'testQuestionList')
    console.log(testAnswerQuestionList,'testAnswerQuestionList')
    return (
        <div>{testInfo.title}

            {testQuestionList.map((question,idx,arr) =>
                { let answerOneQuestion = []; testAnswerQuestionList.map(answers => question.id == answers[0] ? answerOneQuestion.push(answers[1].map((answer) => question.id == answer.question_id ? <li>{answer.value}</li> : '')) : '')
                    return (
                        <div>
                            <div>Question({question.id}): {question.description}</div>
                            <ul>{answerOneQuestion}</ul>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default TestSolutionPage;
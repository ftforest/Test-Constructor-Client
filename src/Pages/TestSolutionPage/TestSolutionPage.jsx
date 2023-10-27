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
        <div>dfsdfsd
            {testQuestionList.map((val,idx,arr) =>
                <div>Question({val.id}): {val.description}</div>
            )}
        </div>
    );
}

export default TestSolutionPage;
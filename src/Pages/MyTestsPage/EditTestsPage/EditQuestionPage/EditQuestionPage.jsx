import React from 'react';
import {useParams} from "react-router";
import {useQuestions} from "../../../../hooks/question-hook";
import {ViewObject} from "../../../../functions/helpers";
import TableComponent from "../../../../Components/TableComponent/TableComponent";
import {useAnswers} from "../../../../hooks/answer-hook";

function EditQuestionPage(props) {
    console.log('EditQuestionPage')
    const { id } = useParams();
    console.log(id,'id ')

    const {QuestionGetId} = useQuestions();
    let questionInfo = QuestionGetId(id)

    const {AnswerGetQuestionId, AnswerEdit, AnswerDelete, AnswerView} = useAnswers();
    let answersList = AnswerGetQuestionId(questionInfo.id)
    return (
        <div>
            <div>{ViewObject(questionInfo,'QuestionInfo')}</div>
            <div>{answersList.map((r,i) => ViewObject(r,'Answer: ' + r.value,i))}</div>
            <TableComponent datatable={answersList} edit={AnswerEdit} view={AnswerView} delet={AnswerDelete} />
        </div>
    );
}

export default EditQuestionPage;
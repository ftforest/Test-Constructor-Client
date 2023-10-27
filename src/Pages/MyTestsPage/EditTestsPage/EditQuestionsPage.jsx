import React from 'react';
import {useTests} from "../../../hooks/test-hook";
import {useQuestions} from "../../../hooks/question-hook";
import {useParams} from "react-router";
import {ViewObject} from "../../../functions/helpers";
import TableComponent from "../../../Components/TableComponent/TableComponent";
function EditTestsPage(props) {
    console.log('EditTestsPage')
    const { id } = useParams();
    console.log(id,'id ')

    const {TestGetId} = useTests();
    let testInfo = TestGetId(id)

    const {QuestionGetTestId, QuestionEdit, QuestionDelete, QuestionView, NameElement} = useQuestions();
    let questionsList = QuestionGetTestId(testInfo.id)

    return (
        <>
            <div>{ViewObject(testInfo,'TestInfo')}</div>
            <div>{questionsList.map((r,i) => ViewObject(r,'Question: ' + r.description,i))}</div>
            <TableComponent datatable={questionsList} additionalId={testInfo.id} createEl={NameElement} btnBackExist={true} edit={QuestionEdit} view={QuestionView} delet={QuestionDelete} />
        </>
);
}

export default EditTestsPage
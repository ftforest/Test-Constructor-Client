import React from 'react';
import TableComponent from "../../Components/TableComponent/TableComponent";
import {useCompletedTests} from "../../hooks/completed-test-hook";

function ComplitedTestsPage(props) {
    let author_id = 14
    let table = [
        [123,2312,3333],
        {'as':1,'fgfg':'zxcx'},
        [2312,3333],
        {'zxc':'as23vvvv'},
        {},
        ['999']
    ]
    const {completedTests, CompletedTestEdit, CompletedTestDelete, CompletedTestView, NameElement} = useCompletedTests();
    table = completedTests;

    return (
        <div>
            <TableComponent btnCreate={'Create New Complited Test'} additionalId={''} createEl={NameElement} datatable={table} edit={CompletedTestEdit} view={CompletedTestView} delet={CompletedTestDelete}/>
        </div>
    );
}

export default ComplitedTestsPage
import React from 'react';
import TableComponent from "../../Components/TableComponent/TableComponent";
import {useTests} from "../../hooks/test-hook";
import {addCaptionsObjOrArrayTwoDimensional} from "../../functions/helpers";

function MyTestsPage(props) {
    let author_id = 14
    let table = [
        [123,2312,3333],
        {'as':1,'fgfg':'zxcx'},
        [2312,3333],
        {'zxc':'as23vvvv'},
        {},
        ['999']
    ]
    const {tests, TestEdit, TestDelete, TestView, NameElement} = useTests();
    table = tests;

    return (
        <div>
            <TableComponent btnCreate={'Create New Test'} additionalId={author_id} createEl={NameElement} datatable={table} edit={TestEdit} view={TestView} delet={TestDelete}/>
        </div>
    );
}

export default MyTestsPage
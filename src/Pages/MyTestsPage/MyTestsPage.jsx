import React from 'react';
import TableComponent from "../../Components/TableComponent/TableComponent";
import {useTests} from "../../hooks/test-hook";
import {addCaptionsObjOrArray, addCaptionsObjOrArrayTwoDimensional, isObject} from "../../functions/helpers";

function MyTestsPage(props) {
    let table = [
        [123,2312,3333],
        {'as':1,'fgfg':'zxcx'},
        [2312,3333],
        {'zxc':'as23vvvv'},
        {},
        ['999']
    ]
    const {tests, TestEdit, TestDelete, TestView} = useTests();
    table = tests;
    let captionsName = []
    captionsName = addCaptionsObjOrArrayTwoDimensional(table)
    table = [captionsName].concat(table)

    return (
        <div>
            <TableComponent datatable={table} edit={TestEdit} view={TestView} delet={TestDelete}/>
        </div>
    );
}

export default MyTestsPage
import React from 'react';
import TableComponent from "../../Components/TableComponent/TableComponent";
import {useTests} from "../../hooks/test-hook";

function MyTestsPage(props) {
    /*let table = [
        ['as','asas','sdsd'],
        ['as23','asas342','sdsd234'],
    ]*/
    const {tests} = useTests();
    let table = tests;

    return (
        <div>
            <TableComponent datatable={table} edit={()=>''} view={()=>''} delet={()=>''}/>
        </div>
    );
}

export default MyTestsPage
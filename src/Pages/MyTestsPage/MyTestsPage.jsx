import React from 'react';
import TableComponent from "../../Components/TableComponent/TableComponent";

function MyTestsPage(props) {
    let table = [
        ['as','asas','sdsd'],
        ['as23','asas342','sdsd234'],
    ]
    return (
        <div>
            <TableComponent datatable={table}/>
        </div>
    );
}

export default MyTestsPage
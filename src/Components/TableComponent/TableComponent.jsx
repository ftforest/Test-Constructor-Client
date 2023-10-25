import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {isEmptyObj, isObject} from "../../functions/helpers";
import {FaAd, FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {forEach} from "react-bootstrap/ElementChildren";

const td = (i,r) => <td key={i}>{r}</td>
const th = (i,r) => <td key={i}><b>{r}</b></td>
const autoAddEmptyCells = (rowLength,lengthAllRow,i,r) => {
    let autoAdd = []
    autoAdd.push(<td key={i}>{r}</td>)
    while (lengthAllRow > (rowLength)) {
        autoAdd.push(<td>empty cell!</td>)
        rowLength++
    }
    return autoAdd;
}
function TableComponent(props) {
    let table = props.datatable
    const TestEdit = props.edit
    const TestView = props.view
    const TestDelete = props.delet
    const tableDom = []
    const lengthAllRow = table[0].length

    if (table === undefined || table.length == 0) return <></>

    table.forEach((row, index) => {
        if (row === undefined || row.length == 0 || isEmptyObj(row)) return <></>
        let rowItem = []
        let id = 0;
        if(isObject(row)) {
            id = row['id']
            Object.keys(row).forEach((key, index) => rowItem.push(row[key]))
            row = rowItem
        } else {
            id = row[0]
        }
        console.log(lengthAllRow,'lengthAllRow')
        tableDom.push(
            <tr key={index}>
                { row.map((r,i) => index == 0  ?
                    th(i,r) : ((row.length) != (i+1)
                        ? td(i,r) : autoAddEmptyCells(row.length,lengthAllRow,i,r)))}
                <td>
                    {index == 0 ? <b>actions</b> :
                        <div className={'wrap-icon-edit'}>
                            <FaUserEdit
                                className={`icon-edit`}
                                color={'red'}
                                onClick={(e) => TestEdit(id, e)}/>
                            <FaTrashAlt
                                className={`icon-edit`}
                                onClick={(e) => TestDelete(id, e)}/>
                            <FaAd
                                className={`icon-edit`}
                                onClick={(e) => TestView(id, e)}/>
                        </div>
                    }
                </td>
            </tr>

        )
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <tbody>{tableDom}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default TableComponent;
import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {addCaptionsObjOrArrayTwoDimensional, isEmptyObj, isObject} from "../../functions/helpers";
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
    let table = props.datatable || []
    const TestEdit = props.edit || null//((id,e) => console.log(id,'id = Edit'))
    const TestView = props.view || null//((id,e) => console.log(id,'id = View'))
    const TestDelete = props.delet || null//((id,e) => console.log(id,'id = Delete'))
    const tableDom = []
    const lengthAllRow = table[0].length

    let captionsName = []
    if(table != undefined && isObject(table[0])) {
        Object.keys(table[0]).forEach((key, index) => captionsName.push(key))
    } else {
        captionsName = addCaptionsObjOrArrayTwoDimensional(table)
    }
    table = [captionsName].concat(table)

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
        tableDom.push(
            <tr key={index}>
                { row.map((r,i) => index == 0  ?
                    th(i,r) : ((row.length) != (i+1)
                        ? td(i,r) : autoAddEmptyCells(row.length,lengthAllRow,i,r)))}
                <td>
                    {index == 0 ? <b>actions</b> :
                        <div className={'wrap-icon-edit'}>
                            { TestEdit != null ?
                            <FaUserEdit
                                className={`icon-edit`}
                                color={'red'}
                                onClick={(e) => TestEdit(id, e)}/>
                                : ''}
                            { TestDelete != null ?
                            <FaTrashAlt
                                className={`icon-edit`}
                                onClick={(e) => TestDelete(id, e)}/>
                                : ''}
                            { TestView != null ?
                            <FaAd
                                className={`icon-edit`}
                                onClick={(e) => TestView(id, e)}/>
                                : ''}
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
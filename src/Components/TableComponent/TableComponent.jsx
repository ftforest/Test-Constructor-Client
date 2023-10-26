import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {addCaptionsObjOrArrayTwoDimensional, isEmptyObj, isObject} from "../../functions/helpers";
import {FaAd, FaTrashAlt, FaUserEdit} from "react-icons/fa";
import Title from "../bootstrap/Title";
import { useNavigate } from 'react-router-dom';

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
    const title = props.title || 'Table'
    const btnCreate = props.btnCreate || 'Create element'
    const btnBackTitle = props.btnBackTitle || '<-Back'
    const btnBackExist = props.btnBackExist || false
    const createEl = props.createEl || ''

    const navigate = useNavigate();

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

    const divStyle1 = {
        color: 'blue',
        //backgroundImage: 'url(' + imgUrl + ')',
        display: 'flex',
        alignSelf:'center',
    };
    const divStyle2 = {
        color: 'blue',
        //backgroundImage: 'url(' + imgUrl + ')',
        display: 'flex',
        alignSelf:'center',
        justifyContent:'space-between',
    };
    const btnStyle = {
        color: 'blue',
        //backgroundImage: 'url(' + imgUrl + ')',
        alignSelf:'center',
    };

    function createElementF(nameEl,e) {
        //e.preventDefault()
        window.location.href = '/create/' + nameEl;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col style={divStyle1}>
                            <Title title={title}/>
                        </Col>
                        <Col style={divStyle2}>
                            <button type="button" style={btnStyle} onClick={(e) => createElementF(createEl,e)}>{btnCreate}</button>
                            { btnBackExist ?
                                <button style={btnStyle} onClick={() => navigate(-1)}>{btnBackTitle}</button>
                            : '' }

                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <tbody>{tableDom}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default TableComponent;
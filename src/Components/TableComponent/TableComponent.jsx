import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {isObject} from "../../functions/helpers";

function TableComponent(props) {
    const table = props.datatable
    const tableDom = [];

    table.forEach((row, index) => {
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
                {row.map((r,i) => <td key={i}>{r}</td>)}
            </tr>
        )
    })

    return (
        <Container>
            <Row>
                <Col>
                    <Table>
                        <tbody>{tableDom}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default TableComponent;
import React from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import Title from "../../components/bootstrap/Title";
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";

function TableComponent(props) {
    const table = props.datatable;

    const results = [];

    table.forEach((row, index) => {
        results.push(
            <tr key={index}>
                {row.map((r,i) => <td key={i}>{r}</td>)}
            </tr>
        );
    });

    return (
        <Container>
            <Row>
                <Col>
                    <Table>
                        <tbody>{results}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>);
}

export default TableComponent;
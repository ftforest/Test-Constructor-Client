import {Col, Container, Row, Table} from "react-bootstrap";
import React, {useState} from "react";
import {useStates} from "./StateProvider";
import Title from "./Title";
import { FaTrashAlt,FaUserEdit } from "react-icons/fa";
import {
    storageAddGet,
    storeDeleteElementsForParam,
    storeGetElementsForParam,
    storeGetParam
} from "../../functions/storege";
import {print} from "../../functions/helpers";

function ListTestsComplitePage(props) {
    let title = "My Tests";
    let btnName = "Create test";
    const {updateTests} = useStates();
    const tests = storeGetParam('completed_tests');
    ;
    const testTable = tests.map(item => {
        let test_title = storeGetElementsForParam("tests","id",item.test_id)[0].title;
        ;
        let result = item.right + "/" + (parseInt(item.right) + parseInt(item.wrong))
        let date_now = new Date();
        let test_result = {
            "id": item.id,
            "user_id": "1",
            "test_id": item.test_id,
            "test_title": test_title,
            "right": item.right,
            "wrong": item.wrong,
            "test_result": result,
            "created_at": date_now.getDate()+"."+(date_now.getMonth()+1)+"."+date_now.getFullYear()
        };
        return test_result;
    });
    //
    const CreateTestF = (e) => {
        e.preventDefault();
        window.location.href = '/create-test/0';
    }
    const EditTestF = (id,e) => {
        e.preventDefault();
        window.location.href = '/create-test/'+id;
    }
    const DeleteTestF = (id,e) => {
        e.preventDefault();
        let data = storeDeleteElementsForParam("tests",'id',id);
        updateTests(data);
    }


    const toggleHover = (state,e) => {
        /*if (state) {
            e.target.color = '#c2c2c9';
        } else {
            e.target.color = 'black';
        }*/
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Title title={title}/>
                        </Col>
                        <Col>
                            <button onClick={CreateTestF}>{btnName}</button>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Title Test</th>
                            <th>Date Complited</th>
                            <th>Resalt</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {testTable.map((test,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{test.test_title}</td>
                                    <td>{test.created_at}</td>
                                    <td>{test.test_result}</td>
                                    <td>
                                        <div className={'wrap-icon-edit'}>
                                                <FaUserEdit
                                                    className={`icon-edit`}
                                                    color={'red'}
                                                    onClick={(e) => EditTestF(test.id, e)}/>
                                                <FaTrashAlt
                                                    className={`icon-edit`}
                                                    onClick={(e) => DeleteTestF(test.id, e)}/>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ListTestsComplitePage;
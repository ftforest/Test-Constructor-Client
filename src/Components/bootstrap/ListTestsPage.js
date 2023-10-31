import {Col, Container, Row, Table} from "react-bootstrap";
import React, {useState, useEffect } from "react";
import {useStates} from "./StateProvider";
import axiosInstance from './../../data/axiosConfig';
import Title from "./Title";
import { FaTrashAlt,FaUserEdit } from "react-icons/fa";
import {storageAddGet, storeDeleteElementsForParam, storeGetParam} from "../../functions/storege";
import {print} from "../../functions/helpers";

function ListTestsPage(props) {
    let title = "My Tests";
    let btnName = "Create test";
    let [hover,setHover] = useState();
    let [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {updateTests, baseURL} = useStates();

    const fetchProtectedData = async () => {
        try {
            const response = await axiosInstance.get(`${baseURL}/tests/tests`);
            ;
            print(response.data,"xxxxxxxx");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let val = localStorage.getItem('getDataTable');
        ;
        ;
        if (val == 'local_storage') {
            setTests(storeGetParam('tests'));
            setIsLoading(false);
        } else if (val == 'data_base') {
            fetchProtectedData().then(data => {
                setTests(data);
                setIsLoading(false);
            })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

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

    if (isLoading) {
        return <div>Loading...</div>;
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
                            <th>Date Create</th>
                            <th>Count Users</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tests.map((test,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{test.title}</td>
                                    <td>{test.created_at}</td>
                                    <td>{test.author_id}</td>
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

export default ListTestsPage;
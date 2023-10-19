import React, { useRef, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStates } from './StateProvider';
import { storeGetParam, storeSaveReWtite } from '../../functions/storege';
import { print } from '../../functions/helpers';
import users_bd from '../../data/users.json';

function FormLoginFn(props) {
    const { goRgistrationForm, LoginApp, handleLogin } = useStates();
    const email = useRef('');
    const password = useRef('');
    const [stor, setStor] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            let fetchedUsers = storeGetParam('users');
            if (fetchedUsers.length === 0) {
                fetchedUsers = users_bd;
                storeSaveReWtite('users', fetchedUsers);
            }
            setUsers(fetchedUsers);
        };

        fetchData();
    }, []);

    const onChange = () => {
        setStor(!stor);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (stor) {
            LoginApp(e, email.current.value, password.current.value, users, 'local_storage');
        } else {
            handleLogin(e, email.current.value, password.current.value, users, 'data_base');
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={password} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    label="connect DB"
                    onClick={onChange}
                    defaultChecked={!stor}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <a href="" onClick={goRgistrationForm}>
                    Registration
                </a>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default FormLoginFn;
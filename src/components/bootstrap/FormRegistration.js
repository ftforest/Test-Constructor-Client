import React, {useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {useStates} from "./StateProvider";

function FormRegistration() {
    const {goLoginForm, RegistrUser} = useStates();
    const email = useRef()
    const password = useRef()
    return (
        <>
            <Form>
                <h1>Registration</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={email} type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={password} type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <a href="" onClick={goLoginForm}>forgot your password ?</a>
                </Form.Group>
                <Button variant="primary" type="submit"
                        onClick={(e)=>RegistrUser(e,email.current.value,password.current.value)}>
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default FormRegistration;
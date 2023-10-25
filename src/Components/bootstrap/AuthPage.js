import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
//import FormLogin from "./FormLogin";
import FormRegistration from "./FormRegistration";
import {useStates} from "./StateProvider";
import {storeSaveReWtite} from "../../functions/storege";
import {print} from "../../functions/helpers";
import users_bd from "../../data/users.json";
import FormLoginFn from "./FormLoginFn";


function AuthPage(props) {
    // const {goRgistrationForm,LoginApp} = useStates();
    // const [users] = useState(users_bd);
    let formIf = props.login;
    let form;
    localStorage.setItem("localStoregOn",true);
    //if (formIf) form = <FormLogin goRgistrationForm={goRgistrationForm} users={users}  LoginApp={LoginApp}/>
    if (formIf) form = <FormLoginFn/>
    else form = <FormRegistration/>
    //

    return (
        <Container>
            <Row>
                <Col>
                    <div className="position-absolute top-50 start-50 translate-middle">
                        {form}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthPage;
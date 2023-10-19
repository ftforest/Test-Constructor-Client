import React, {useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {useStates, StateContext, StateProvider} from "./StateProvider";
import {storeGetParam, storeSaveReWtite} from "../../functions/storege";
import {print} from "../../functions/helpers";

//function FormLogin(props) {
class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.users = storeGetParam("users");
        if (this.users.length == 0) {
            this.users = props.users
            let data = storeSaveReWtite("users",props.users);

        }
        //this.myRef = React.createRef();
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            counter: 0,
            message: 'Hello, World!'
        };
    }
    componentDidMount() {
        // Вызывается после монтирования компонента
        // Вы можете использовать setState() для обновления состояния компонента
    }

    componentDidUpdate(prevProps, prevState) {
        // Вызывается после обновления компонента
        // Вы можете использовать setState() для обновления состояния компонента
    }

    componentWillUnmount() {
        // Вызывается перед размонтированием компонента
        // Вы можете выполнять очистку или отписываться от событий
    }
    handleClick = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    };
    render() {
        const { counter, message } = this.state;
        return (
            <StateProvider>
            <Form>
                <h1>{message}</h1>
                <p>Counter: {counter}</p>
                <h1>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  placeholder="Enter email" ref={this.email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={this.password} placeholder="Password"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <a href="" onClick={(e)=>this.props.goRgistrationForm(e)}>Rgistration</a>
                </Form.Group>
                <Button variant="primary" type="submit"
                         onClick={(e)=> this.props.LoginApp(e,this.email.current.value,this.password.current.value,this.users)}
                >
                    Submit
                </Button>
            </Form>
            </StateProvider>
        );
    }
}

export default FormLogin;
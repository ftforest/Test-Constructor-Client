import {React} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useStates} from "./Components/bootstrap/StateProvider";


function Menu(props) {
    const {states, LogoutApp} = useStates();
    var storedAccess = null;
    if (localStorage.getItem('access')) {
        storedAccess = localStorage.getItem('access');
    }
    let menu = '';
    if (states.access || storedAccess) {
        menu = <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/my-tests">Мои тесты</NavDropdown.Item>
                    <NavDropdown.Item href="/complited-tests">Завершенные</NavDropdown.Item>
                    <NavDropdown.Item href="/profile">Профиль</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="/tests">Страница Мои тесты</NavDropdown.Item>
                    <NavDropdown.Item href="/complited-tests-page">Страница Завершенные тесты</NavDropdown.Item>
                    <NavDropdown.Item href="/test/solution/1">Пройти тест с ID = 1</NavDropdown.Item>
                    <NavDropdown.Item href="/exit" onClick={LogoutApp}>Выход</NavDropdown.Item>
                </NavDropdown>
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Tests Creater</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {menu}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
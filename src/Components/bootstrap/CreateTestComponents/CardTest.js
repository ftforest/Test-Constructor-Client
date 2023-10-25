import React from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Form} from "react-bootstrap";

function CardTest(props) {

    return (
        <Card className="text-center">
            <Card.Header>Questions </Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>

                </Card.Text>
                <Button variant="primary"></Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}

export default CardTest;
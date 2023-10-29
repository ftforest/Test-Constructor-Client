import React from 'react';
import {Form} from "react-bootstrap";

function FormElementsComponent(props) {
    let id = props.id || 0
    let addId = props.addId || 0
    let structure = props.structure || {}
    let dataObj = props.dataObj || {}


    let formElements = []
    Object.keys(structure).forEach((key,idx) => {
       if (structure[key].type == 'text') {
           let item = (
               <Form.Group key={idx} className="mb-3" controlId="formBasicEmail">
                   <Form.Label>{key}</Form.Label>
                   <Form.Control type={structure[key].type} placeholder={key} name={key} readOnly={(id != undefined && key == 'id' ) || 'addId' == structure[key].value ? true : false}  defaultValue={key.match(/_id/) ? addId : dataObj[key]} />
                   <Form.Text className="text-muted">
                   </Form.Text>
               </Form.Group>
           )
            formElements.push(item)
      }
        if (structure[key].type == 'list') {
            formElements.push(
                <List key={idx} name={key} options={structure[key].options} correct={structure[key].correct} />
            )
        }
    })
    return (
        <div>aSAs{formElements}</div>
    );
}



function List(props) {
    let options = props.options || []
    let correct = props.correct || 0
    let name = props.name || ''
    let idx = props.key || ''
    return (
        <Form.Group key={idx} className="mb-3" controlId="formBasicEmail">
            <Form.Label>{name}</Form.Label>
            <select name={name} >
                {Object.keys(options).map((key,i) => <option selected={options[key] == correct ?? true} value={options[key]}>{key}</option>)}
            </select>
        </Form.Group>
    )
}


export default FormElementsComponent;
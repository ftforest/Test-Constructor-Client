import React from 'react';
import {useParams} from "react-router";

function CreateElementPage(props) {
    const { name } = useParams();
    console.log(name,'name ')
    const nameEl = name || 'empty name'

    const dataObj = props.dataObj || {
        id:1,
        title:'sd',
        author_id:123,
        created_at:'3123123123'
    }
    let form = []
    Object.keys(dataObj).forEach((key,idx) =>
        form.push(<><label htmlFor={idx}></label><br/><input type="text" id={idx} name={dataObj[key]} value={dataObj[key]} /><br/></>))

    return (
        <div>
            {nameEl}
            {form}
        </div>
    )
}

export default CreateElementPage
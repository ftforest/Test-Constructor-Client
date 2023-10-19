import React from 'react';
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {Table} from "react-bootstrap";
import {useStates} from "../StateProvider";
import {storeGetParam, storeSaveReWtite} from "../../../functions/storege";

function SaveTestBtn(props) {
    const test_id =  props.test_id;
    const questions =  props.questions;
    const answers =  props.answers;
    const nameTest =  props.nameTest;
    const {addTest} = useStates();
    const tests = storeGetParam('tests');
    //
    function saveTestOne(test_id,e) {
        //
        // let test_ident = 0;
        // if (parseInt(test_id) > 0) test_ident = test_id;
        /*else {
            test_ident = 0;
            tests.map((item) => {
                if (item.id >= test_ident) test_ident = item.id + 1;
            });
        }*/
        const test_data = {
            "id": (test_id > 0) ? test_id : 0,
            "title": nameTest,
            "author_id": "1",
            "created_at": "03.30.2023"
        };
        
        //if (test_id == test_ident)
        addTest(test_data,e);
        storeSaveReWtite('questions',questions);
        storeSaveReWtite('answers',answers);
        window.location.href = '/my-tests';
    }
    return (
        <>
            <button onClick={(e) => saveTestOne(test_id, e)}>Save test</button>
        </>
    );
}

export default SaveTestBtn;
import React from 'react';
import {storeGetParam} from "../../../functions/storege";

const TestTitle = ({ test_title, onChange }) => {

    const handleChange = (event) => {
        onChange(event.target.value) // callback-функция
    }
    return (
        <div className="test-title">
            <h3>Name Test:</h3>
            <input
                type="text"
                onChange={handleChange}
                defaultValue={test_title}
            />
        </div>
    )
}

export default TestTitle;
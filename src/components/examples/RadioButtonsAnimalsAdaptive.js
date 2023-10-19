import React, {useEffect} from 'react';
import {storeSetElementForParam} from "../../functions/storege";
const RadioButtonsAnimalsAdaptive = (props) => {
    console.log('answers',props.answers)
    let answers = props.answers;
    let question = props.question;

    const [answer_id, setAnswerId] = React.useState(answers[0].id);

    const handleChange = (id,e) => {
        setAnswerId(id);
        let data = storeSetElementForParam('answers',"question_id",question.id,"correct",false);
    };

    /*useEffect(() => {
        console.log('RadioButtonsAnimalsAdaptive favorite')
    }, [answer_id]);*/

    const list_answers_radio = answers.map((answer, idx) => {
        return (
            <RadioButton
                key={idx}
                label={answer.value}
                value={answer_id === answer.id}
                onChange={(e) => handleChange(answer.id,e)}
            />
        );
    });

    return (
      <>
          {list_answers_radio}
      </>
    );
};

const RadioButton = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="radio" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

export default RadioButtonsAnimalsAdaptive;
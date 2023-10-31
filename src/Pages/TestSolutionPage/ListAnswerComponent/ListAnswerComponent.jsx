import React from 'react';
import OneAnswerComponent from "./OneAnswerComponent/OneAnswerComponent";

function ListAnswerComponent(props) {
    let answerList = props.answer
    let question = props.question
    
    
    return (
        <div>
            {answerList.map((answer,idx) => <OneAnswerComponent key={idx} answer={answer} question={question}/>)}
        </div>
    );
}

export default ListAnswerComponent;
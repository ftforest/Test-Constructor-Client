import React, {useState} from 'react';
import CardOneTest from "./CardOneTest";
import AddQuestionOneTest from "./AddQuestionOneTest";
import SaveTestBtn from "./SaveTestBtn";
import TestTitle from "./TestTitle";
import {
    storeEditElements,
    storeGetElementsForParam,
    storeGetObjectById,
    storeGetParam
} from "../../../functions/storege";
import {print} from "../../../functions/helpers";
import {useStates} from "../StateProvider";

function ListQuestions(props) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);

    //const array_questions =  props.questions;
    //const array_answers =  props.answers;
    const {refrashQuestions} = useStates();
    let test_id = props.test_id;
    if (test_id == null) test_id = 0;
    const array_questions =  storeGetParam('questions');
    const array_answers =  storeGetParam('answers');
    const tests = storeGetParam('tests').filter(item => item.id == test_id)[0];
    
    let test_title = '';
    if (tests == undefined) test_title = '';
    else test_title = tests.title;
    const [nameTest, setNameTest] = useState(test_title);
    const handleChange = (value) => {
        setNameTest(value)
    }
    //console.log(array_questions)
    const handleDragStart = (e, index, question) => {
        e.dataTransfer.setData('index', index);
        print(index, 'index')
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        const { clientX, clientY } = touch;
        setPosition({ x: clientX, y: clientY });
        setIsDragging(true);
    };

    const handleTouchMove = (event) => {
        if (!isDragging) return;
        const touch = event.touches[0];
        const { clientX, clientY } = touch;
        const deltaX = clientX - position.x;
        const deltaY = clientY - position.y;
        setPosition({ x: clientX, y: clientY });

        // Здесь можно обновить положение элемента в состоянии или выполнить другие действия по перетаскиванию
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleDrop = (e, index, question) => {
        print(index,'index')
        const draggedIndex = parseInt(e.dataTransfer.getData('index'));
        print(draggedIndex,'draggedIndex');

        const allQuectionOneTest = storeGetElementsForParam('questions','test_id',question.test_id)
        print(allQuectionOneTest,'allQuectionOneTest')

        allQuectionOneTest.sort((a, b) => a.order - b.order);
        const remainingQuestions = allQuectionOneTest.filter((item, index) => index !== draggedIndex);
        const draggedQuestion = allQuectionOneTest.filter((item, index) => index === draggedIndex)[0];
        print(draggedQuestion,'draggedQuestion')
        print(remainingQuestions,'remainingQuestions')

        let newQuestionsUpdate = [
            ...remainingQuestions.slice(0, index),
            draggedQuestion,
            ...remainingQuestions.slice(index),
        ];
        print(newQuestionsUpdate,'newQuestionsUpdate')
        const QuestionsOrder = newQuestionsUpdate.map((item,index)=>{
            item.order = index;
            return item;
        });
        let data = storeEditElements("questions",QuestionsOrder)
        refrashQuestions(data);
    };

    /*array_questions.sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
    });*/
    array_questions.sort((a, b) => a.order - b.order);
    let idx_questions = 0;
    const list = array_questions.map((question) => {
        if (question.test_id == test_id) {
            let answers = array_answers.filter(item => item.question_id == question.id);
            return (
                <li key={idx_questions}>
                    <CardOneTest
                        test_id={test_id}
                        idx={idx_questions++}
                        question={question}
                        answers={answers}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    />
                </li>
            );
        }
    });


    //if (test_id != 0)
        return (
            <>
                <TestTitle test_title={test_title} onChange={handleChange}/>
                <ul className="list-questions">
                    {list}
                </ul>
                <AddQuestionOneTest test_id={test_id}/>
                <SaveTestBtn test_id={test_id} nameTest={nameTest} questions={array_questions} answers={array_answers}/>
            </>
        );
    /*else {
        return (
            <div>zzzzzzzzzzzzzzzzzzzz</div>
        );
    }*/
}

export default ListQuestions;
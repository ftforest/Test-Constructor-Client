import React, {useState} from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([
        {id: 1, text: 'Task 1'},
        {id: 2, text: 'Task 2'},
        {id: 3, text: 'Task 3'},
    ]);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index);
    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = (e, index) => {
        const draggedIndex = parseInt(e.dataTransfer.getData('index'));
        const draggedTodo = todos[draggedIndex];
        const remainingTodos = todos.filter((todo, index) => index !== draggedIndex);
        console.log(remainingTodos,'remainingTodos');
        const newTodos = [
            ...remainingTodos.slice(0, index),
            draggedTodo,
            ...remainingTodos.slice(index),
        ];
        setTodos(newTodos);
    };

    return (
        <div>
            {todos.map((todo, index) => (
                <div
                    key={todo.id}
                    draggable="true"
                    onDragStart={e => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={e => handleDrop(e, index)}
                >
                    {todo.text}
                </div>
            ))}
        </div>
    );
}
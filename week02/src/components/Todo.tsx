import { useState } from "react";
import type { TTodo } from "../types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);
        const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
        const [input, setInput] = useState<string>('');
        
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const text = input.trim();
            if (text) {
                const newTodo: TTodo = {
                    id: Date.now(),
                    text,
                };
                setTodos((prevTodos) : TTodo[]=> [...prevTodos, newTodo]);
                setInput('');
            }
        };
    
        const completeTodo = (todo: TTodo) => {
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
            setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
        };
    
        const deleteTodo = (todo: TTodo) => {
            setDoneTodos((prevDoneTodos) => prevDoneTodos.filter((t) => t.id !== todo.id));
        }; 
    return (
        <div className = 'todo-container'>
            <h1 className = 'todo-container__header'>ZIO TODO</h1>
            <TodoForm input = {input} setInput = {setInput} handleSubmit = {handleSubmit} />
            <div className='render-container'>
                <TodoList 
                    title='할 일'
                    todos={todos}
                    buttonText='완료'
                    buttonColor='lightsteelblue'
                    onButtonClick={completeTodo}
                />
                <TodoList 
                    title='완료'
                    todos={doneTodos}
                    buttonText='삭제'
                    buttonColor='lightcoral'
                    onButtonClick={deleteTodo}  
                />
            </div>
        </div>
    );
};
export default Todo;
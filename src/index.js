import {ToDo, ToDoList} from './classes';
import {crearToDoHTML} from './js/componentes.js';
import './styles.css';

export const todoList = new ToDoList();

todoList.todos.forEach(todo => crearToDoHTML(todo));
// o tambien: todoList.todos.forEach(crearToDoHTML);
import { ToDo } from "../classes";
import { todoList } from "../index";

// Referencias en HTML
const divToDoList  = document.querySelector('.todo-list');
const inputText    = document.querySelector('.new-todo');
const buttonBorrar = document.querySelector('.clear-completed');
const ulFilters    = document.querySelector('.filters');
const aFiltro      = document.querySelectorAll('.filtro');

export const crearToDoHTML = (todo) => {
    const HTMLToDo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
    </li>`;
    const divHTMLToDoElement     = document.createElement('div');
    divHTMLToDoElement.innerHTML = HTMLToDo;
    divToDoList.appendChild(divHTMLToDoElement.firstElementChild);

    return divHTMLToDoElement.firstElementChild;
}

// Eventos
inputText.addEventListener('keyup', (e) => {
    if (inputText.value && e.keyCode === 13)
    {
        const nuevoToDo = new ToDo(inputText.value);
        todoList.nuevoToDo(nuevoToDo);
        crearToDoHTML(nuevoToDo);
        inputText.value = '';
    }
});

divToDoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName;
    const todoElemento   = e.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    if (nombreElemento.includes('input'))
    {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }
    else if (nombreElemento.includes('button'))
    {
        todoList.eliminarToDo(todoId);
        divToDoList.removeChild(todoElemento);
    }
});

buttonBorrar.addEventListener('click', (e) => {
    todoList.eliminarCompletados();
    for (let i  = divToDoList.length - 1; i >= 0; i--)
    {
        const elemento = divToDoList.children[i];
        if (elemento.classList.contains('completed'))
        {
            divToDoList.removeChild(elemento);
        }
    }
});

ulFilters.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if (!filtro)
    {
        return;
    }

    aFiltro.forEach(aElement => aElement.classList.remove('selected'));
    e.target.classList.add('selected');

    for (const elemento of divToDoList.children)
    {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro)
        {
            case 'Pendientes' :
                if (completado)
                {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados' :
                if (!completado)
                {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});
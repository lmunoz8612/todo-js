import { ToDo } from "./index";

export class ToDoList
{
    /**
     * Constructor
     */
    constructor()
    {
        this.cargarLocalStorage()
    }

    nuevoToDo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarToDo(id) {
        this.todos = this.todos.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos)
        {
            if (todo.id == id)
            {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map(ToDo.fromJSON);
    }
}
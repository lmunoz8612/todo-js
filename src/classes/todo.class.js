export class ToDo
{
    static fromJSON({id, tarea, completado, fechaCreacion}) {
        const tmpToDo = new ToDo(tarea);
        tmpToDo.id            = id;
        tmpToDo.completado    = completado;
        tmpToDo.fechaCreacion = fechaCreacion;

        return tmpToDo;
    }
    
    /**
     * Constructor
     */
    constructor(tarea)
    {
        this.tarea         = tarea;
        this.id            = new Date().getTime();
        this.completado    = false;
        this.fechaCreacion = new Date();
    }
}
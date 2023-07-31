import { useState } from "react";

export default function Todo({ item, onUpdate, onDelete }) {

    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState(item.title)

    function newValue(e) {
        e.preventDefault();
        const value = e.target.value;
        setEditValue(value);
        console.log(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdate(item.id, editValue);
        setIsEdit(false);
    }

    function TodoElement() {
        return (
            <div className='input-group m-2 shadow'>
                <input disabled type="text" className='form-control fw-bold' value={item.title} />
                <button onClick={() => setIsEdit(true)} className='btn btn-dark shadow'>Editar</button>
                <button onClick={(e) => onDelete(item.id)} className='btn btn-danger shadow'>Eliminar</button>
            </div>
        );
    }

    return (
        <div>
            {
                isEdit ? (
                    <form onSubmit={handleSubmit}>
                        <div className='input-group m-2'>
                            <input onChange={newValue} value={editValue} type="text" className='form-control fw-bold' />
                            <button type='submit' className='btn btn-dark'>Guardar</button>
                        </div>
                    </form>
                ) : <TodoElement />
            }
        </div>
    );
}
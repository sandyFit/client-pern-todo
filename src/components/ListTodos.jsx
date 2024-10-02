import React, { useState, useEffect } from 'react';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);

    // Delete todo
    const deleteTodo = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
            method: "DELETE"
        });

        console.log("Todo Eliminado");
        setTodos(todos.filter(todo => todo.todo_id !== id)); // Update the todos after deleting

    } catch (err) {
        console.log(err.message);
    }
}


    // Fetch todos from the API
    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData); // Set the state with the fetched data
        } catch (err) {
            console.log(err.message);
        }
    }

    
    // Fetch todos when the component mounts
    useEffect(() => {
        getTodos();
        
    }, []);

    return (
        <div className='mt-5'>
            <div className="col-lg-10">
                <h1 className="text-center mt-5">ALL TODOS</h1>

                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={index}>
                                <td>{todo.todo_id}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button className="btn btn-warning">Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteTodo(todo.todo_id)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTodos;

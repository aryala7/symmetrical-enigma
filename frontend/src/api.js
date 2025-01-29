import axios from 'axios'
const API_URL = 'http://localhost:5001/todos'

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const createTodo = async (task) => {
    const url = API_URL + '/create';
    const response = (await axios.post(url,
        {'task':task,checked:false,},
        {headers: {'Content-Type': 'application/json'}}
    ));
    return response.data
}

export const removeTodo = async (id) => {
    const url = API_URL + '/delete'
    const response = (await axios.delete(url,{
        data:{id:id},
        headers: {'Content-Type': 'application/json'}
    }))
    return response.data
}
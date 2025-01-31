import axios from 'axios'
const API_URL = 'http://localhost:5001/todos'

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const createTodo = async (task) => {
    const url = generateUrl('create')
    const response = (await axios.post(url,
        {'task':task,checked:false,},
        {headers: {'Content-Type': 'application/json'}}
    ));
    return response.data
}

export const removeTodo = async (id) => {
    const url = generateUrl('delete')
    const response = (await axios.delete(url,{
        data:{id:id},
        headers: {'Content-Type': 'application/json'}
    }))
    return response.data
}

export const checkedTodo = async(id) => {
    const url = generateUrl('checked')
    const response = (await axios.put(url,
        {'id':id},
        {headers:{'Content-Type':'application/json'}}
    ))
    return response.data
}

const generateUrl = (postfix) => {
    return `${API_URL}/${postfix}`;
}
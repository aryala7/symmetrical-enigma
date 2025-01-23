import axios from 'axios'
const API_URL = 'http://localhost:5001/'

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}
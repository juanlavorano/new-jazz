import axios from 'axios'

const api = axios.create({
    headers: {  
        'Accept': 'application/json',  
        'Content-Type': 'application/json'  
    },  
    baseURL:'http://localhost:5000/api'
})

export default api
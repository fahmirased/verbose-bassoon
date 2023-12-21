import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(respone => respone.data)
}

const create = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (id, name) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}
export default {
    getAll,
    create,
    remove,
    update
}
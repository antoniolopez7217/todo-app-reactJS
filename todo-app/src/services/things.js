import axios from 'axios'

const baseUrl = 'http://localhost:3001/things'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newItem => {	
	const request = axios.post(baseUrl, newItem)
	return request.then(response => response.data)
}

const remove = id => {
	const request = remove.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const thingService = {getAll, create, remove}

export default thingService
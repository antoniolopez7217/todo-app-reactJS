import axios from 'axios'

const baseUrl = 'http://localhost:3001/things'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newThing => {	
	const request = axios.post(baseUrl, newThing)
	return request.then(response => response.data)
}

const remove = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const update = ({id, changedThing}) => {
	const request = axios.put(`${baseUrl}/${id}`, changedThing)
	return request.then(response => response.data)
}


const thingService = {getAll, create, remove, update}

export default thingService
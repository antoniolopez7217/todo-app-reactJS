import axios from 'axios'

const baseUrl = 'http://localhost:3001/things'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const thingService = {getAll}

export default thingService
import axios from 'axios'

const url = '/login'

const login = async ({ username, password }) => {
	const res = await axios.post(url, {username: username, password: password})
	return res.data
}

export default {
	login
}
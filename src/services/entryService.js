import axios from 'axios'

const url = '/entries'

const tokenString = token => {
	return `bearer ${token}`
}

const get = async () => {
	const config = {
		headers: { Authorization: `${tokenString(JSON.parse(window.localStorage.getItem('LoggedUser')).token)}` }
	}
	const res = await axios.get(url, config)
	return res.data
}

const submit = async entry => {
	const config = {
		headers: { Authorization: `${tokenString(JSON.parse(window.localStorage.getItem('LoggedUser')).token)}` }
	}

	const res = await axios.post(url, entry, config)
	return res.data
}

export default {
	get, submit
}
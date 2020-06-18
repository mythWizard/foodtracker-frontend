import axios from 'axios'

const url = '/search'

const search = async (q) => {
	const res = await axios.post(url, { upc: q })
	return res.data
}

export default {
	search
}
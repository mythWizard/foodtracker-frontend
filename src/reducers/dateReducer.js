export const setDate = (date) => {
	return async dispatch => {
		dispatch({
			type: 'SETDATE',
			data: date
		})
	}
}

const dateReducer = (state = new Date().toISOString().split('T')[0], action) => {
	switch(action.type){
		case 'SETDATE':
			return action.data
		default:
			return state
	}
}

export default dateReducer
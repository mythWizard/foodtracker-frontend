import foodService from '../services/entryService'

export const initEntries = (u) => {
	return async dispatch => {
		const entries = await foodService.get(u)
		dispatch({
			type: 'INITENTRIES',
			data: entries
		})
	}
}

const entryReducer = (state = [], action) => {
	switch(action.type){
		case 'INITENTRIES':
			return action.data
		default:
			return state
	}
}

export default entryReducer
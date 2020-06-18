export const userLogin = (user) => {
	return async dispatch => {
		dispatch({
			type: 'LOGIN',
			data: user
		})
	}
}

export const userLogout = () => {
	return async dispatch => {
		dispatch({
			type: 'LOGOUT'
		})
	}
}

const userReducer = (state = null, action) => {
	switch(action.type){
		case 'LOGIN':
			return action.data
		case 'LOGOUT':
			return null
		default:
			return state
	}
}

export default userReducer
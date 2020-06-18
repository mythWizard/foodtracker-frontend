import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initEntries } from '../reducers/entryReducer'
import { userLogout } from '../reducers/userReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import FoodChart from './FoodChart'
import FoodLog from './FoodLog'

const UserView = () => {

	const user = useSelector(state => state.user)
	
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initEntries(user))
	}, [dispatch])

	const handleLogout = async () => {
		await dispatch(userLogout())
		window.localStorage.removeItem('LoggedUser')
	}

	return(
		<div>
			<AppBar position='static'>
				<Toolbar>
					<Button color='inherit' onClick={handleLogout}>Logout</Button>
				</Toolbar>
			</AppBar>
			<FoodChart />
			<FoodLog />
		</div>
	)
}

export default UserView
import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const MenuBar = () => {

	const dispatch = useDispatch()

	const handleLogout = async () => {
		await dispatch(userLogout())
		window.localStorage.removeItem('LoggedUser')
	}

	return(
		<AppBar position='static'>
			<Toolbar>
				<Typography edge='start'>Food Tracker</Typography>
				<Button edge='end' color='inherit' onClick={handleLogout}>Logout</Button>
			</Toolbar>
		</AppBar>
	)
}

export default MenuBar
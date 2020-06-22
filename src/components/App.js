import React, { useEffect } from 'react'
import Login from './Login'
import UserView from './UserView'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

const App = () =>{

	const user = useSelector(state => state.user)

	return (
		<Container disableGutters={true} maxWidth={false}>
			<div>
				{!user && <Login />}
				{user && <UserView />}
			</div>
		</Container>
	)
}

export default App

import React, { useEffect } from 'react'
import Login from './Login'
import UserView from './UserView'
import { useSelector } from 'react-redux'

const App = () =>{

	const user = useSelector(state => state.user)

	return (
		<div>
			{!user && <Login />}
			{user && <UserView />}
		</div>
	)
}

export default App

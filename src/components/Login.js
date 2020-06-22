import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/loginService'
import { userLogin } from '../reducers/userReducer'
import { FormControl, Input, InputLabel, Button } from '@material-ui/core'

const Login = () => {
	
	const dispatch = useDispatch()
	useEffect(() => {
		const loggedUser = window.localStorage.getItem('LoggedUser')
		if(loggedUser){
			const u = JSON.parse(loggedUser)
			dispatch(userLogin(u))
		}
	}, [dispatch])

	const handleLogin = async (e) => {
		e.preventDefault()
		try{
			const u = await loginService.login({username: e.target.username.value, password: e.target.password.value})
			await dispatch(userLogin(u))
			window.localStorage.setItem('LoggedUser', JSON.stringify(u))
		}	catch(e) {
			console.error(e.message.data.error)
		}
	}

	return(
		<form onSubmit={handleLogin}>
			<div>
			<FormControl>
				<InputLabel htmlFor='username'>Username:</InputLabel>
				<Input id='username' type='text'/>
			</FormControl>
			</div>

			<div>
			<FormControl>
				<InputLabel htmlFor='password'>Password:</InputLabel>
				<Input id='password' type='password' />
			</FormControl>
			</div>

			<div>
				<Button type='submit' variant='contained' color='primary'>Login!</Button>
			</div>
		</form>
	)
}

export default Login
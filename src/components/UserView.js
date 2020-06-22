import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initEntries } from '../reducers/entryReducer'
import MenuBar from './MenuBar'
import { Grid } from '@material-ui/core'
import FoodChart from './FoodChart'
import FoodLog from './FoodLog'

const UserView = () => {

	const user = useSelector(state => state.user)
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initEntries(user))
	}, [user, dispatch])

	return(
		<div>
			<MenuBar />
			<Grid container spacing={3}>
				<Grid item>
					<FoodChart />
				</Grid>
				<Grid item>
					<FoodLog />
				</Grid>
			</Grid>
		</div>
	)
}

export default UserView
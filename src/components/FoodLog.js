import React, { useState } from 'react'
import FoodForm from './FoodForm'
import Entry from './Entry'
import { useSelector, useDispatch } from 'react-redux'
import { setDate } from '../reducers/dateReducer'
import { Input, Grid } from '@material-ui/core'

const FoodLog = () => {

	const entries = useSelector(state => state.entries)
	const today = new Date().toISOString().split('T')[0]
	//Needs to update when the day updates

	const dispatch = useDispatch()
	const date = useSelector(state => state.date)

	//const [date, setDate] = useState(today)

	return(
		<div>
			<Grid container direction='column'>
				<Grid item>
					<FoodForm />
				</Grid>
				<Grid item>
					<Input type='date' id='date' value={date} onChange={(e) => dispatch(setDate(e.target.value))}/>
					<h2>Breakfast</h2>
					<Grid container>
						{entries.filter(e => e.date.split('T')[0] === date).filter(e => e.meal === 'Breakfast').map(e => <Entry key={e.id} entry={e}/>)}
					</Grid>
					<h2>Lunch</h2>
					<Grid container>
						{entries.filter(e => e.date.split('T')[0] === date).filter(e => e.meal === 'Lunch').map(e => <Entry key={e.id} entry={e}/>)}
					</Grid>
					<h2>Dinner</h2>
					<Grid container>
						{entries.filter(e => e.date.split('T')[0] === date).filter(e => e.meal === 'Dinner').map(e => <Entry key={e.id} entry={e}/>)}
					</Grid>
					<h2>Snacks</h2>
					<Grid container>
						{entries.filter(e => e.date.split('T')[0] === date).filter(e => e.meal === 'Snack').map(e => <Entry key={e.id} entry={e}/>)}
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default FoodLog
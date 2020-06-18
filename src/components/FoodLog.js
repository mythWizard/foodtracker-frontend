import React, { useState } from 'react'
import FoodForm from './FoodForm'
import Entry from './Entry'
import { useSelector } from 'react-redux'
import { Input } from '@material-ui/core'

const FoodLog = () => {

	const entries = useSelector(state => state.entries)
	const today = new Date().toISOString().split('T')[0]
	//Needs to update when the day updates

	const [date, setDate] = useState(today)

	return(
		<div>
			<FoodForm />
			<Input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)}/>
			{entries.filter(e=> e.date.split('T')[0] === date).map(e => <Entry key={e.id} entry={e}/>)}
		</div>
	)
}

export default FoodLog
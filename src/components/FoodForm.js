import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core'
import foodService from '../services/foodService'

const FoodForm = () => {

	const [entry, setEntry] = useState({})
	const [upc, setUPC] = useState('')
	const [name, setName] = useState('')
	const [item, setItem] = useState({})

	const createLog = (e) => {
		e.preventDefault()
		console.log('Submitted')
	}

	const handleSearch = async () => {
		const i = await foodService.search(upc)
		setItem(i)
		setName(i.foods[0].food_name)
	}

	console.log('Search:', item)

	return (
		<div>
			<h2>Add Entry</h2>
			<div>
				Search for UPC: <Input type='text' id='upc' value={upc} onChange={(e) => setUPC(e.target.value)} />
				<Button variant='contained' color='primary' type='button' onClick={handleSearch}>Search!</Button>
				<div>
					Item: <Input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
				</div>
			</div>
			<form onSubmit={createLog}>
				<Button variant='contained' color='primary' type='submit'>Submit!</Button>
			</form>
		</div>
	)
}

export default FoodForm
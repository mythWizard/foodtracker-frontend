import React, { useState } from 'react'
import { Button, Input, Select, MenuItem } from '@material-ui/core'
import foodService from '../services/foodService'
import entryService from '../services/entryService'
import { useSelector } from 'react-redux'

const FoodForm = () => {

	const date = new Date().toISOString().split('T')[0]
	const entries = useSelector(state => state.entries)

	const [entry, setEntry] = useState({
		name: '',
		servings: '',
		calories: '',
		carbs: '',
		fiber: '',
		sugars: '',
		protein: '',
		fat: '',
		saturated: '',
		sodium: '',
		meal: 'Breakfast',
		date: new Date().toISOString().split('T')[0]
	})
	const [upc, setUPC] = useState('')
	const [item, setItem] = useState(entry)

	const createLog = async (e) => {
		e.preventDefault()
		const newLog = await entryService.submit(entry)
		console.log(newLog)
		//DISPATCH ADD ENTRY
	}

	const handleSearch = async () => {
		const i = await foodService.search(upc)

		setItem({
			...item,
			name: i.foods[0].food_name,
			servings: 1,
			calories: i.foods[0].nf_calories === null ? 0 : i.foods[0].nf_calories,
			carbs: i.foods[0].nf_total_carbohydrate === null ? 0 : i.foods[0].nf_total_carbohydrate,
			fiber: i.foods[0].nf_dietary_fiber === null ? 0 : i.foods[0].nf_dietary_fiber,
			sugars: i.foods[0].nf_sugars === null ? 0 : i.foods[0].nf_sugars,
			protein: i.foods[0].nf_protein === null ? 0 : i.foods[0].nf_protein,
			fat: i.foods[0].nf_total_fat === null ? 0 : i.foods[0].nf_total_fat,
			saturated: i.foods[0].nf_saturated_fat === null ? 0 : i.foods[0].nf_saturated_fat,
			sodium: i.foods[0].nf_sodium === null ? 0 : i.foods[0].nf_sodium
		})
		console.log(i.foods[0])
		setEntry({
			...entry,
			name: i.foods[0].food_name,
			servings: 1,
			calories: i.foods[0].nf_calories === null ? 0 : i.foods[0].nf_calories,
			carbs: i.foods[0].nf_total_carbohydrate === null ? 0 : i.foods[0].nf_total_carbohydrate,
			fiber: i.foods[0].nf_dietary_fiber === null ? 0 : i.foods[0].nf_dietary_fiber,
			sugars: i.foods[0].nf_sugars === null ? 0 : i.foods[0].nf_sugars,
			protein: i.foods[0].nf_protein === null ? 0 : i.foods[0].nf_protein,
			fat: i.foods[0].nf_total_fat === null ? 0 : i.foods[0].nf_total_fat,
			saturated: i.foods[0].nf_saturated_fat === null ? 0 : i.foods[0].nf_saturated_fat,
			sodium: i.foods[0].nf_sodium === null ? 0 : i.foods[0].nf_sodium
		})
	}

	//console.log(entry)

	const handleServings = servings => {
		//IF ITEM IS SET
		setEntry({
			...entry,
			servings: servings,
			calories: item.calories * servings,
			carbs: item.carbs * servings,
			fiber: item.fiber * servings,
			sugars: item.sugars * servings,
			protein: item.protein * servings,
			fat: item.fat * servings,
			saturated: item.saturated * servings,
			sodium: item.sodium * servings
		})
	}

	return (
		<div>
			<h2>Add Entry</h2>
			<div>
				Search for UPC: <Input type='text' id='upc' value={upc} onChange={(e) => setUPC(e.target.value)} />
				<Button variant='contained' color='primary' type='button' onClick={handleSearch}>Search!</Button>
			</div>
			<form onSubmit={createLog}>
				Name: <Input type='text' id='name' value={entry.name} onChange={(e) => { setEntry({...entry, name: e.target.value}) }}/>
				Servings: <Input type='text' id='servings' value={entry.servings} onChange={(e) => handleServings(e.target.value)}/>
				Calories: <Input type='text' id='calories' value={entry.calories} onChange={(e) => { setEntry({...entry, calories: e.target.value}) }}/>
				Carbs: <Input type='text' id='carbs' value={entry.carbs} onChange={(e) => { setEntry({...entry, carbs: e.target.value}) }}/>
				Dietary Fiber: <Input type='text' id='fiber' value={entry.fiber} onChange={(e) => { setEntry({...entry, fiber: e.target.value}) }}/>
				Sugars: <Input type='text' id='sugars' value={entry.sugars} onChange={(e) => { setEntry({...entry, sugars: e.target.value}) }}/>
				Protein: <Input type='text' id='protein' value={entry.protein} onChange={(e) => { setEntry({...entry, protein: e.target.value}) }}/>
				Fat: <Input type='text' id='fat' value={entry.fat} onChange={(e) => { setEntry({...entry, fat: e.target.value}) }}/>
				Saturated: <Input type='text' id='saturated' value={entry.saturated} onChange={(e) => { setEntry({...entry, saturated: e.target.value}) }}/>
				Sodium: <Input type='text' id='sodium' value={entry.sodium} onChange={(e) => { setEntry({...entry, sodium: e.target.value}) }}/>
				Meal: <Select id='meal' defaultValue={entry.meal} onChange={(e) => { setEntry({...entry, meal: e.target.value})}}>
				<MenuItem value='Breakfast'>Breakfast</MenuItem>
				<MenuItem value='Lunch'>Lunch</MenuItem>
				<MenuItem value='Dinner'>Dinner</MenuItem>
				<MenuItem value='Snack'>Snack</MenuItem>
			</Select>
			Date: <Input type='date' id='entrydate' value={entry.date} onChange={(e) => {setEntry({...entry, date: e.target.value})}} />
			<Button variant='contained' color='primary' type='submit'>Submit!</Button>
		</form>

		</div>
		)
}

export default FoodForm
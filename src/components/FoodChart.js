import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import { Grid, Button } from '@material-ui/core'

const FoodChart = () => {

	const d3Calories = entries => {
		//console.log(entries)
		const converted = {
			'name': 'entries',
			'children': []
		}

		if(entries.filter(e => e.meal === 'Breakfast').length > 0){
		converted.children = converted.children.concat({
			'name': 'Breakfast',
			'children': entries.filter(e => e.meal === 'Breakfast').map(e => { return {value: e.calories, ...e} })
		})}
		if(entries.filter(e => e.meal === 'Lunch').length > 0){
		converted.children = converted.children.concat({
			'name': 'Lunch',
			'children': entries.filter(e => e.meal === 'Lunch').map(e => { return {value: e.calories, ...e} })
		})}
		if(entries.filter(e => e.meal === 'Dinner').length > 0){
		converted.children = converted.children.concat({
			'name': 'Dinner',
			'children': entries.filter(e => e.meal === 'Dinner').map(e => { return {value: e.calories, ...e} })
		})}
		if(entries.filter(e => e.meal === 'Snack').length > 0){
		converted.children = converted.children.concat({
			'name': 'Snacks',
			'children': entries.filter(e => e.meal === 'Snack').map(e => { return {value: e.calories, ...e} })
		})}

		return converted
	}

	const d3Macros = entries => {

		const fat = {
			'name': 'Fat',
			'value': `${entries.reduce((acc, cur) => acc += cur.fat, 0) * 9}`
		}

		const prot = {
			'name': 'Protein',
			'value': `${entries.reduce((acc, cur) => acc += cur.protein, 0) * 4}`
		}

		const carb = {
			'name': 'Carbs',
			'value': `${entries.reduce((acc, cur) => acc += cur.carbs, 0) * 4}`
		}

		const converted = {
			'name': 'entries',
			'children': [fat, prot, carb]
		}

		return converted

	}

	const computeTextRotation = d => {
		const angle = (d.x0 + d.x1) / Math.PI * 90
		return (angle < 90 || angle > 270) ? angle : angle + 180 
	}

	const drawSunburst = data => {

		d3.selectAll('svg > *').remove()

		const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

		const size = window.innerWidth / 4 > window.innerHeight / 4 ? window.innerWidth / 4 : window.innerHeight / 4

		const g = d3.select('svg')
			.attr('width', size)
			.attr('height', size)
			.append('g')
			.attr('transform', `translate(${size / 2}, ${size / 2})`)

		const partition = d3.partition()
			.size([2 * Math.PI, size / 2])

		const root = d3.hierarchy(data)
			.sum(d => d.value)

		console.log(root.value)

		const nodes = root.descendants()

		partition(root)
	
		const arc = d3.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.innerRadius(d => d.y0)
			.outerRadius(d => d.y1)

		const slices = g.selectAll('g')
			.data(nodes)
			.enter()
			.append('g')


		slices.append('path')
			.attr('display', d => d.depth ? null : 'none')
			.attr('d', arc)
			.style('stroke', '#fff')
			.style('fill', d => color((d.children ? d : d.parent).data.name))

		slices.append('text')
			.filter(d => d.parent)
			.attr('transform', d => `translate(${arc.centroid(d)})rotate(${computeTextRotation(d)})`)
			.attr('dx', d => d.parent ? -(d.data.name.substr(0, 10).length * 3) : "")
			.attr('dy', '0.5em')
			.attr('font-size', 'smaller')
			.attr('fill', '#fff')
			.text(d => d.parent ? (d.children ? `${d.data.name.substr(0, 10)}\n${(d.value * 100 / root.value).toString().substr(0,4)}%` : `${d.data.name.substr(0, 10)}\n${(d.data.value * 100 / root.value).toString().substr(0,4)}%`) : '')
			.style('white-space', 'pre-line')
	}

	const setCalories = () =>{
		setMode('calories')
	}

	const setMacros =() => {
		setMode('macros')
	}

	const date = useSelector(state => state.date)
	const entries = useSelector(state => state.entries).filter(e => e.date.split('T')[0] === date)
	//const [data, setData] = useState({})
	const [mode, setMode] = useState('macros')

	const data = mode === 'macros' ? d3Macros(entries) : d3Calories(entries)

	if(entries.length > 0){
		drawSunburst(data)
	}

	const style = {
		display: entries.length > 0 ? '' : 'none'
	}

	return (
		<Grid container direction='column' style={style}>
			<Grid item>
				<svg/>
			</Grid>
			<Grid item>
				<Button variant='contained' color='primary' type='button' onClick={setCalories}>Calories</Button>
				<Button variant='contained' color='primary' type='button' onClick={setMacros}>Macros</Button>
			</Grid>
		</Grid>
	)
}

export default FoodChart
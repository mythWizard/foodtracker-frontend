import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import { Grid, Button, Typography } from '@material-ui/core'

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

		/*const fat = {
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
		}*/

		const fat = {
			'name': 'Fat',
			'children': []
		}

		const prot = {
			'name': 'Protein',
			'children': []
		}

		const carb = {
			'name': 'Carbs',
			'children': []
		}

		if(entries.filter(e => e.meal === 'Breakfast').length > 0){
			fat.children = fat.children.concat({
			'name': 'Breakfast',
			'children': entries.filter(e => e.meal === 'Breakfast').map(e => { return {value: e.fat * 9, ...e} })
			})

			prot.children = prot.children.concat({
			'name': 'Breakfast',
			'children': entries.filter(e => e.meal === 'Breakfast').map(e => { return {value: e.protein * 4, ...e} })
			})

			carb.children = carb.children.concat({
			'name': 'Breakfast',
			'children': entries.filter(e => e.meal === 'Breakfast').map(e => { return {value: e.carbs * 4, ...e} })
			})
		}

		if(entries.filter(e => e.meal === 'Lunch').length > 0){
			fat.children = fat.children.concat({
			'name': 'Lunch',
			'children': entries.filter(e => e.meal === 'Lunch').map(e => { return {value: e.fat * 9, ...e} })
			})

			prot.children = prot.children.concat({
			'name': 'Lunch',
			'children': entries.filter(e => e.meal === 'Lunch').map(e => { return {value: e.protein * 4, ...e} })
			})

			carb.children = carb.children.concat({
			'name': 'Lunch',
			'children': entries.filter(e => e.meal === 'Lunch').map(e => { return {value: e.carbs * 4, ...e} })
			})
		}

		if(entries.filter(e => e.meal === 'Dinner').length > 0){
			fat.children = fat.children.concat({
			'name': 'Dinner',
			'children': entries.filter(e => e.meal === 'Dinner').map(e => { return {value: e.fat * 9, ...e} })
			})

			prot.children = prot.children.concat({
			'name': 'Dinner',
			'children': entries.filter(e => e.meal === 'Dinner').map(e => { return {value: e.protein * 4, ...e} })
			})

			carb.children = carb.children.concat({
			'name': 'Dinner',
			'children': entries.filter(e => e.meal === 'Dinner').map(e => { return {value: e.carbs * 4, ...e} })
			})
		}

		if(entries.filter(e => e.meal === 'Snacks').length > 0){
			fat.children = fat.children.concat({
			'name': 'Snacks',
			'children': entries.filter(e => e.meal === 'Snacks').map(e => { return {value: e.fat * 9, ...e} })
			})

			prot.children = prot.children.concat({
			'name': 'Snacks',
			'children': entries.filter(e => e.meal === 'Snacks').map(e => { return {value: e.protein * 4, ...e} })
			})

			carb.children = carb.children.concat({
			'name': 'Snacks',
			'children': entries.filter(e => e.meal === 'Snacks').map(e => { return {value: e.carbs * 4, ...e} })
			})
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

	/*const drawSunburst = data => {

		d3.selectAll('svg > *').remove()

		const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

		const size = window.innerWidth / 4 > window.innerHeight / 4 ? window.innerWidth / 4 : window.innerHeight / 4

		const g = d3.select('svg')
			.attr('width', size)
			.attr('height', size)
			.append('g')
			.attr('transform', `translate(${size / 2}, ${size / 2})`)

		const partition = d3.partition()
			.size([2 * Math.PI, size/2])

		const root = d3.hierarchy(data)
			.sum(d => d.value)

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
			.style('fill', d => color(d.data.name))//(d.children ? d : d.parent).data.name))

		slices.append('text')
			.filter(d => d.parent)
			.attr('transform', d => `translate(${arc.centroid(d)})rotate(${computeTextRotation(d)})`)
			.attr('dx', d => d.parent ? -(d.data.name.substr(0, 10).length * 3) : "")
			.attr('dy', '0.5em')
			.attr('font-size', 'smaller')
			.attr('fill', '#fff')
			.text(d => d.parent ? (d.children ? `${d.data.name.substr(0, 10)}\n${(d.value * 100 / root.value).toString().substr(0,4)}%` : `${d.data.name.substr(0, 10)}\n${(d.data.value * 100 / root.value).toString().substr(0,4)}%`) : '')
			.style('white-space', 'pre-line')
	}*/

	const drawSunburst = data => {
		d3.selectAll('svg > *').remove()

		const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

		const size = window.innerWidth / 3 > window.innerHeight / 3 ? window.innerWidth / 3 : window.innerHeight / 3

		const radius = size / 6

		const partition = data => {
			const root = d3.hierarchy(data)
				.sum(d => d.value)
				.sort((a, b) => b.value - a.value);
			
			return d3.partition()
				.size([2 * Math.PI, root.height + 1])
				(root);
		}

		const format = d3.format(",d")

		const root = partition(data);

		root.each(d => d.current = d);

		const svg = d3.select("svg")
			.attr('width', size)
			.attr('height', size)
			.style("font", "10px sans-serif");

		const g = svg.append("g")
			.attr("transform", `translate(${size / 2},${size / 2})`);

		const arc = d3.arc()
			.startAngle(d => d.x0)
			.endAngle(d => d.x1)
			.padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
			.padRadius(radius * 1.5)
			.innerRadius(d => d.y0 * radius)
			.outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

		const path = g.append("g")
			.selectAll("path")
			.data(root.descendants().slice(1))
			.join("path")
			.attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
			.attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
			.attr("d", d => arc(d.current));

		path.filter(d => d.children)
			.style("cursor", "pointer")
			.on("click", clicked);

		path.append("title")
			.text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

		const label = g.append("g")
			.attr("pointer-events", "none")
			.attr("text-anchor", "middle")
			.style("user-select", "none")
			.selectAll("text")
			.data(root.descendants().slice(1))
			.join("text")
			.attr("dy", "0.35em")
			.attr("fill-opacity", d => +labelVisible(d.current))
			.attr("transform", d => labelTransform(d.current))
			.text(d => d.data.name);

		const parent = g.append("circle")
			.datum(root)
			.attr("r", radius)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("click", clicked);

		function clicked(p) {
			parent.datum(p.parent || root);

			root.each(d => d.target = {
				x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				y0: Math.max(0, d.y0 - p.depth),
				y1: Math.max(0, d.y1 - p.depth)
			});

		const t = g.transition().duration(750);

		// Transition the data on all arcs, even the ones that aren’t visible,
		// so that if this transition is interrupted, entering arcs will start
		// the next transition from the desired position.
		path.transition(t)
				.tween("data", d => {
					const i = d3.interpolate(d.current, d.target);
					return t => d.current = i(t);
				})
			.filter(function(d) {
				return +this.getAttribute("fill-opacity") || arcVisible(d.target);
			})
				.attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
				.attrTween("d", d => () => arc(d.current));

		label.filter(function(d) {
				return +this.getAttribute("fill-opacity") || labelVisible(d.target);
			}).transition(t)
				.attr("fill-opacity", d => +labelVisible(d.target))
				.attrTween("transform", d => () => labelTransform(d.current));
		}
	
		function arcVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
		}

		function labelVisible(d) {
			return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
		}

		function labelTransform(d) {
			const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
			const y = (d.y0 + d.y1) / 2 * radius;
			return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
		}

		return svg.node();
	}


	const setCalories = () =>{
		setData(d3Calories(entries))
		//setMode('calories')
	}

	const setMacros =() => {
		setData(d3Macros(entries))
		//setMode('macros')
	}

	const date = useSelector(state => state.date)
	const entries = useSelector(state => state.entries).filter(e => e.date.split('T')[0] === date)
	//const [data, setData] = useState({})
	//const [mode, setMode] = useState('calories')

	const [data, setData] = useState(d3Calories(entries))
	//const data = mode === 'macros' ? d3Macros(entries) : d3Calories(entries)

	if(entries.length > 0){
		drawSunburst(data)
	}

	const style = {
		display: entries.length > 0 ? '' : 'none'
	}

	return (
		<div>
		{ entries.length > 0 &&
		<Grid container direction='column'>
			<Grid item>
				<svg/>
			</Grid>
			<Grid item>
				<Button variant='contained' color='primary' type='button' onClick={setCalories}>Calories</Button>
				<Button variant='contained' color='primary' type='button' onClick={setMacros}>Macros</Button>
			</Grid>
		</Grid> }
		{ entries.length === 0 && 
		<Grid container direction='column'>
			<Grid item>
				<Typography>
					No data to report.
				</Typography>
			</Grid>
		</Grid>
		}
		</div>
	)
}

export default FoodChart
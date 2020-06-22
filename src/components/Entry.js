import React from 'react'
import { Card, CardContent, Typography, Grid, Paper, Button } from '@material-ui/core'

const Entry = ({ entry }) => {
	return (
		<Grid item>
		<Card>
			<CardContent>
				<Typography variant='h5'>
					{entry.name}
				</Typography>
				<Grid container spacing={3}>
					<Grid item>
						<Paper>
							<Grid container direction='column'>
								<Grid item><Typography variant='h6'>Calories</Typography></Grid>
								<Grid item>{entry.calories}g</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<Paper>
							<Grid container direction='column'>
								<Grid item><Typography variant='h6'>Carbs</Typography></Grid>
								<Grid item>{entry.carbs}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Fiber</Grid>
								<Grid item>{entry.fiber}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Sugars</Grid>
								<Grid item>{entry.sugars}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Net Carbs</Grid>
								<Grid item>{Number(entry.carbs) - Number(entry.fiber)}g</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<Paper>
							<Grid container direction='column'>
								<Grid item><Typography variant='h6'>Protein</Typography></Grid>
								<Grid item>{entry.protein}g</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item>
						<Paper>
							<Grid container direction='column'>
								<Grid item><Typography variant='h6'>Fat</Typography></Grid>
								<Grid item>{entry.fat}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Saturated</Grid>
								<Grid item>{entry.saturated}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Monounsaturated</Grid>
								<Grid item>{entry.monounsaturated}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Polyunsaturated</Grid>
								<Grid item>{entry.polyunsaturated}g</Grid>
							</Grid>
							<Grid container direction='column'>
								<Grid item>Trans</Grid>
								<Grid item>{entry.trans}g</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
				<Button type='button' variant='contained' color='primary'>Delete</Button>
			</CardContent>
		</Card>
		</Grid>
	)
}

export default Entry
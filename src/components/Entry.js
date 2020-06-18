import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

const Entry = ({ entry }) => {
	return (
		<Card>
			<CardContent>
				<Typography>
					{entry.item}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Entry
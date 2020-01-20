import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
	cardContainer: {
		width: 300,
		margin: '20px auto',
		padding: 16,
	},
	input: {
		width: '100%',
		marginTop: '18px',
	},
	cardContent: {
		padding: 0,
	},
	actions: {
		padding: '16px 0 0',
	},
})

const SignIn = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const { input, cardContent, actions } = useStyles()

	const signIn = () => {
		console.log(username, password)
	}

	return (
		<React.Fragment>
			<CardContent className={cardContent}>
				<TextField
					id='standard-password-input'
					value={username}
					onChange={e => setUsername(e.target.value)}
					label='Username'
					type='text'
					className={input}
				/>
				<TextField
					id='standard-password-input'
					value={password}
					onChange={e => setPassword(e.target.value)}
					label='Password'
					type='password'
					autoComplete='current-password'
					className={input}
				/>
			</CardContent>
			<CardActions className={actions}>
				<Button
					onClick={signIn}
					variant='outlined'
					color='primary'
					size='medium'
				>
					Sign in
				</Button>
			</CardActions>
		</React.Fragment>
	)
}

export default SignIn
